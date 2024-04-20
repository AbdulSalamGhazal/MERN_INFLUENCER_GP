function CampaignFilters({ campaignName, status, payment, isApproved }) {
  let query = {};

  if (campaignName) {
    query.campaignName = { $regex: new RegExp(campaignName, "i") };
  }

  if (status && status.length) {
    query.status = { $in: status };
  }

  if (payment && payment.length) {
    query.payment = { $in: payment };
  }

  if (isApproved === "true") {
    query.isApproved = true;
  } else {
    query.isApproved = false;
  }
  return query;
}

module.exports = CampaignFilters;
