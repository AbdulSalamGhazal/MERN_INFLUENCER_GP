const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    influencerId: { type: mongoose.Schema.Types.ObjectId, ref: "Influencer" },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
    lastMessage: String,
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    // isSeen: Boolean, to be added
  },
  { timestamps: true }
);

chatSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const docToUpdate = await this.model.findOne(this.getQuery());

    const latestMessages = await this.model.findById(docToUpdate._id).populate({
      path: "messages",
      options: { sort: { createdAt: -1 } },
    });

    const lastMessageContent =
      latestMessages.messages.length > 1
        ? latestMessages.messages[1].content
        : null;

    docToUpdate.lastMessage = lastMessageContent;

    await docToUpdate.save();
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Chat", chatSchema);
