const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema(
  {
    influencerId: { type: mongoose.Schema.Types.ObjectId, ref: "Influencer" },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    campaignName: String,
    conditions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    status:String,
    paymentStatus: String,

  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
