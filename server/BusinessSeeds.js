// create some seeds influencers to test in developments...
const influencer = require("./models/influencer");
const Influencer = require("./models/influencer");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MERN_INFLUENCER_GP");

const businesses = [
  {
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

    generalRequest: [String],
    budgetRange: {
      min: Number,
      max: Number,
    },
  },
];

// Inserting the documents

async function createBusinesses() {
  for (const business of businesses) {
    try {
      const doc = await Influencer.create(business);
      console.log("Influencer created:", doc);
    } catch (err) {
      console.error("Error creating influencer:", err);
    }
  }
}

createBusinesses();
