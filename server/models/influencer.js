const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const influencerSchema = new Schema({
  name: String,
  email: String,
  location: String,
  image: String,
  description: String,
  platforms: [String],
  field: String,
  verified: {
    type: Boolean,
    default: false,
  },

  avg_cost: Number,

  special_requriements: [String],
  personal_interests: String,

  total_followers: Number,

  audience_location: [String],
  audience_age_rang: String,
  audience_gender: Number,
  audience_interests: [String],

  avg_likes: Number,
  avg_comments: Number,
});
influencerSchema.virtual("engagement_rate").get(function () {
  if (this.total_followers === 0) {
    return 0;
  }
  return ((this.avg_likes + this.avg_comments) / this.total_followers) * 100;
});

influencerSchema.set("toJSON", { virtuals: true });
influencerSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Influencer", influencerSchema);
