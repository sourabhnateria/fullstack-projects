const User = require("../models/User");
const Session = require("../models/Session");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

// -------------------------------------------
// Register a new user (public)
// -------------------------------------------
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    // Optionally auto-login after registration:
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken();

    await Session.create({
      userId: user._id,
      refreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------------------------
// Login
// -------------------------------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!user.isActive) {
      return res.status(403).json({ message: "Account deactivated" });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken();

    await Session.create({
      userId: user._id,
      refreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------------------------
// Refresh access token using refresh cookie
// -------------------------------------------
exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const session = await Session.findOne({ refreshToken });
    if (!session || session.expiresAt < new Date()) {
      // Invalid or expired token – clear it
      if (session) await Session.deleteOne({ _id: session._id });
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    const user = await User.findById(session.userId);
    if (!user || !user.isActive) {
      await Session.deleteOne({ _id: session._id });
      return res.status(403).json({ message: "User inactive or deleted" });
    }

    // Rotate tokens: remove old session, create new one
    await Session.deleteOne({ _id: session._id });

    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken();

    await Session.create({
      userId: user._id,
      refreshToken: newRefreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------------------------
// Logout (single session)
// -------------------------------------------
exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await Session.deleteOne({ refreshToken });
  }
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

// -------------------------------------------
// Logout from all devices (clear all sessions)
// -------------------------------------------
exports.logoutAll = async (req, res) => {
  await Session.deleteMany({ userId: req.user.id });
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out from all devices" });
};

// -------------------------------------------
// Get active sessions for current user
// -------------------------------------------
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id }).select(
      "-refreshToken",
    );
    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------------------------
// Get current logged-in user profile
// -------------------------------------------
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------------------------
// Update current user's profile (name / phone)
// -------------------------------------------
exports.updateMe = async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (name !== undefined && !name.trim()) {
      return res.status(400).json({ message: "Name cannot be empty" });
    }

    const update = {};
    if (name !== undefined) update.name = name.trim();
    if (phone !== undefined) update.phone = phone.trim();

    const user = await User.findByIdAndUpdate(req.user.id, update, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------------------------
// Change current user's password
// -------------------------------------------
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password are required" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------------------------
// Addresses: list is included on the user object (getMe).
// These endpoints add/update/delete/set-default individual entries.
// -------------------------------------------
exports.addAddress = async (req, res) => {
  try {
    const { label, line1, line2, city, state, pincode, isDefault } = req.body;
    if (!line1 || !city || !state || !pincode) {
      return res
        .status(400)
        .json({ message: "line1, city, state and pincode are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const makeDefault = isDefault || user.addresses.length === 0;
    if (makeDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push({
      label,
      line1,
      line2,
      city,
      state,
      pincode,
      isDefault: makeDefault,
    });
    await user.save();

    res.status(201).json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { label, line1, line2, city, state, pincode, isDefault } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    if (label !== undefined) address.label = label;
    if (line1 !== undefined) address.line1 = line1;
    if (line2 !== undefined) address.line2 = line2;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pincode !== undefined) address.pincode = pincode;

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
      address.isDefault = true;
    }

    await user.save();
    res.json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    const wasDefault = address.isDefault;
    address.deleteOne();

    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    res.json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
