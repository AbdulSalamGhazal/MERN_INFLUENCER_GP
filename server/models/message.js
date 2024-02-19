const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["Influencer", "Business"],
    },
    content: { type: String, trim: true },
    type: {
      type: String,
      enum: ["Normal", "Condition"],
      default: "Normal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
