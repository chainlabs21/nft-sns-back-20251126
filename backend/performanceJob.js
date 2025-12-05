const Performance = require("./Performance");
const ItemSNS = require("./ItemSns");
const SNSKey = require("./SnsKey");
const snsService = require("./snsServics");

module.exports = async function performanceJob() {
  console.log("\n📊 Performance Job Started:", new Date());

  const items = await ItemSNS.findAll({ where: { status: [1, 2] } });
  if (!items.length) return console.log("No items to track performance.");

  for (const item of items) {
    try {
      // Get SNS key using sns_id (not sns_kind)
      const snsKey = await SNSKey.findOne({ where: { sns_id: item.sns_id } });
      if (!snsKey) continue;

      // Fetch performance (likes/views/comments)
      const data = await snsService.fetchSNSPerformance(item.sns_kind, snsKey.api_key, item);

      // Save performance in DB
      await Performance.create({
        item_id: item.item_id,
        kind: "views", // you can loop for likes/comments if needed
        item_sns_id: item.id,
        sns_id: item.sns_id,
        sns_symbol: item.sns_kind,
        raw_value: data.views,
        score: Math.floor(data.views / 7000),
        notes: `${data.views} auto-generated views`,
        createdat: new Date(),
        updatedat: new Date(),
        update_ts: new Date(),
      });

      console.log(`✔ Performance inserted for item_sns ${item.id}`);
    } catch (err) {
      console.error("❌ Performance error:", err.message);
    }
  }
};
