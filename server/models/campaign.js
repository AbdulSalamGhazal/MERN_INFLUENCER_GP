const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema(
  {
    influencerId: { type: mongoose.Schema.Types.ObjectId, ref: "Influencer" },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    campaignName: String,
    conditions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    status: String,
    payment: String,
    paymentFile: String,
    paymentNote: String,
    amount: Number,
    date: String,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
