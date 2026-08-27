const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const mongoose = require("mongoose");

(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected:", conn.connection.host);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
