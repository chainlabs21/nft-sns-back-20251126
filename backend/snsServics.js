module.exports = {
  async postToSNS(kind, api_key, item) {
    return {
      platform_assigned_id: "POST-" + Date.now(),
      url: `https://sns.com/${kind}/${Date.now()}`,
    };
  },

  async fetchSNSPerformance(kind, api_key, item) {
    return {
      likes: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 50000),
      comments: Math.floor(Math.random() * 300),
    };
  },
};
