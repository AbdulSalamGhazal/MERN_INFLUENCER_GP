function filters({
  name,
  field,
  platforms,
  audience,
  avg_cost_min,
  avg_cost_max,
  total_followers,
  location,
  verified,
}) {
  let query = {};

  if (name) {
    query.name = { $regex: new RegExp(name, "i") };
  }

  if (field && field.length) {
    query.field = { $in: field };
  }

  if (platforms && platforms.length) {
    query.platforms = { $in: platforms };
  }
  if (audience && audience.length) {
    query.audience_interests = { $in: audience };
  }

  if (avg_cost_min !== undefined || avg_cost_max !== undefined) {
    query.avg_cost = {};
    if (avg_cost_min !== undefined) query.avg_cost.$gte = avg_cost_min;
    if (avg_cost_max !== undefined) query.avg_cost.$lte = avg_cost_max;
  }

  if (total_followers !== undefined) {
    query.total_followers = { $lte: total_followers };
  }

  if (location && location.length) {
    query.audience_location = { $in: location };
  }
  if (verified === "true") {
    query.verified = true;
  }
  return query;
}

module.exports = filters;
