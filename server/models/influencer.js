const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const influencerSchema = new Schema({
  name: String,
  email: String,
  password: String,
  location: String,
  image: String,
  description: String,
  platforms: [String],
  field: String,
  verified: {
    type: Boolean,
    default: false,
  },
  isActive: {
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
  autoReply: String,
});
influencerSchema.virtual("engagement_rate").get(function () {
  if (this.total_followers === 0) {
    return 0;
  }
  return ((this.avg_likes + this.avg_comments) / this.total_followers) * 100;
});

influencerSchema.set("toJSON", { virtuals: true });
influencerSchema.set("toObject", { virtuals: true });

influencerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

influencerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model("Influencer", influencerSchema);
