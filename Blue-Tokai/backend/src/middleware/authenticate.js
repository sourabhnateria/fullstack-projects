const { verifyAccessToken } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Same as authenticate, but for routes guests may also use (e.g. checkout).
// Populates req.user when a valid token is present, otherwise just proceeds
// as a guest instead of rejecting the request.
const optionalAuthenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = { id: decoded.userId, role: decoded.role };
  } catch (error) {
    // Invalid/expired token on a guest-allowed route — proceed as guest.
  }
  next();
};

authenticate.optional = optionalAuthenticate;

module.exports = authenticate;
