const businessSchema = new Schema({
  companyName: { type: String, required: true },
  industry: String, // list of options
  size: String, // list of options
  email: String,
  address: String,

  websiteURL: String,
  socialMediaLinks: [String],
  description: String,

  targetAudience: String, // list of options
  campaignGoals: [String], // points

  generalRequest: [String],
  budgetRange: {
    min: Number,
    max: Number,
  },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
