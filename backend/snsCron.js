const cron = require("node-cron");
const exposureJob = require("./exposureJob");
const performanceJob = require("./performanceJob");

module.exports = function startSnsCron() {

  // Runs every hour at minute 0
  cron.schedule("0 * * * *", async () => {
    console.log("CRON: Running exposureJob...");
    try {
      await exposureJob();
    } catch (err) {
      console.error("Exposure Job Error:", err);
    }
  });

  // Runs every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    console.log("CRON: Running performanceJob...");
    try {
      await performanceJob();
    } catch (err) {
      console.error("Performance Job Error:", err);
    }
  });

  console.log("SNS Cron jobs scheduled");
};
