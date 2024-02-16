const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    influencerId: { type: mongoose.Schema.Types.ObjectId, ref: "Influencer" },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
