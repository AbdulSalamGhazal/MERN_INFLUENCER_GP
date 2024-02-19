const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    influencerId: { type: mongoose.Schema.Types.ObjectId, ref: "Influencer" },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    lastMessage: String,
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    // isSeen: Boolean, to be added
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
