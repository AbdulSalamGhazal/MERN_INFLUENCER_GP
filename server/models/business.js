const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const businessSchema = new Schema({
  companyName: { type: String, required: true },
  industry: String,
  size: String,
  email: String,
  password: String,
  address: String,
  image: String,

  websiteURL: String,
  socialMediaLinks: [String],
  description: String,

  targetAudience: [String],
  campaignGoals: [String],
  isActive: {
    type: Boolean,
    default: false,
  },
  generalRequest: [String],
  budgetRange: {
    min: Number,
    max: Number,
  },
  autoReply: String,
});
businessSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

businessSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Business", businessSchema);
