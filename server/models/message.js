const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["Influencer", "Business"],
    },
    content: { type: String, trim: true },
    isCondition: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
