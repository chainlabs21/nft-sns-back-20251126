const { Op } = require("sequelize");
const ItemSNS = require("./ItemSns");
const SNSKey = require("./SnsKey");
const sns = require("./snsServics");

module.exports = async function exposureJob() {
  console.log("\n🚀 Exposure Job Started:", new Date());

  // Fetch all items ready for pre-exposure
  const items = await ItemSNS.findAll({
    where: {
      status: 0,
      pre_exposure_start_ts: { [Op.lte]: new Date() },
    },
  });

  if (!items.length) return console.log("No items ready for exposure.");

  for (const item of items) {
    try {
      // Pick SNS key by sns_id (not sns_kind) and lowest use count
      const snsKey = await SNSKey.findOne({
        where: { sns_id: item.sns_id },
        order: [["count_use_span", "ASC"]],
      });

      if (!snsKey) {
        console.log("❌ No SNS key available for sns_id:", item.sns_id);
        continue;
      }

      // Post to SNS (simulated)
      const response = await sns.postToSNS(item.sns_kind, snsKey.api_key, item);

      // Update item_sns row
      await item.update({
        status: 1,
        status_str: "pre_expose",
        platform_assigned_id: response.platform_assigned_id,
        url: response.url,
        updatedat: new Date(),
      });

      // Increment SNS key usage
      await snsKey.update({ count_use_span: (snsKey.count_use_span || 0) + 1 });

      console.log(`✔ Posted item_sns ID ${item.id}`);
    } catch (err) {
      console.error("❌ Posting error:", err.message);
    }
  }
};
