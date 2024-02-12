const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  companyName: { type: String, required: true },
  industry: String, // list of options
  size: String, // list of options
  contactInformation: {
    email: String,
    phone: String,
    address: String,
  },
  websiteURL: String,
  socialMediaLinks: [String],
  description: String,
  targetAudience: String, // list of options
  campaignGoals: [String], // points
  preferredInfluencerProfile: {
    field: String,
    followerCount: Number,
    engagementRate: Number,
  },
  budgetRange: {
    min: Number,
    max: Number,
  },
  accountManager: {
    name: String,
    email: String,
    phone: String,
  },
});

const Business = mongoose.model("Business", businessSchema);
