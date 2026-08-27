const dns = require("dns").promises;
dns.setServers(["1.1.1.1", "8.8.8.8"]);
(async () => {
  try {
    console.log("SRV:");
    console.log(
      await dns.resolveSrv("_mongodb._tcp.cluster0.445ufkd.mongodb.net"),
    );

    console.log("A:");
    console.log(await dns.resolve4("cluster0.445ufkd.mongodb.net"));
  } catch (err) {
    console.error(err);
  }
})();
