function BusinessFilters({ companyName, industry, campaignGoals }) {
  let query = {};

  if (companyName) {
    query.companyName = { $regex: new RegExp(companyName, "i") };
  }

  if (industry && industry.length) {
    query.industry = { $in: industry };
  }

  if (campaignGoals && campaignGoals.length) {
    query.campaignGoals = { $in: campaignGoals };
  }

  return query;
}

module.exports = BusinessFilters;
