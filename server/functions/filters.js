function filters({
  name,
  field,
  platforms,
  avg_cost_min,
  avg_cost_max,
  total_followers,
}) {
  // Initialize the query object
  let query = {};

  // Name search (case-insensitive partial match)
  if (name) {
    query.name = { $regex: new RegExp(name, "i") };
  }

  // Field filter (multiple values)
  if (field && field.length) {
    query.field = { $in: field };
  }

  // Platform filter (multiple values)
  if (platforms && platforms.length) {
    query.platforms = { $in: platforms };
  }

  // Average cost range
  if (avg_cost_min !== undefined || avg_cost_max !== undefined) {
    query.avg_cost = {};
    if (avg_cost_min !== undefined) query.avg_cost.$gte = avg_cost_min;
    if (avg_cost_max !== undefined) query.avg_cost.$lte = avg_cost_max;
  }

  // Total followers range
  if (total_followers !== undefined) {
    query.total_followers = { $lte: total_followers };
  }

  return query;
}

module.exports = filters;
