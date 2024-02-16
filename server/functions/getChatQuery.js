function getChatQuery(senderId, senderType, receiverId) {
  let chatQuery = {};
  if (senderType === "Influencer") {
    chatQuery = { influencerId: senderId, businessId: receiverId };
  } else if (senderType === "Business") {
    chatQuery = { influencerId: receiverId, businessId: senderId };
  }
  return chatQuery;
}
module.exports = getChatQuery;
