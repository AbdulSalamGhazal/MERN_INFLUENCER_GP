if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const filters = require("./functions/filters");
const campaignFilters = require("./functions/campaignFilters");
const businessFilters = require("./functions/BusinessFilters");
const getChatQuery = require("./functions/getChatQuery");
const Influencer = require("./models/influencer");
const Business = require("./models/business");
const Chat = require("./models/chat");
const Message = require("./models/message");
const Campaign = require("./models/campaign");
const asyncHandler = require("express-async-handler");
const generateToken = require("./config/generateToken");
const { storage } = require("./cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const { protect } = require("./middleware/authMiddleware");
const influencer = require("./models/influencer");
const business = require("./models/business");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/MERN_INFLUENCER_GP");

app.get("/influencers", async (req, res) => {
  const query = filters(req.query);
  const influencers = await Influencer.find(query);
  res.json(influencers);
});
app.get("/influencers/:id", async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ message: "influencer not found" });
    }
    const campaigns = await Campaign.find({
      influencerId: influencer._id,
    }).populate({
      path: "businessId",
      select: "companyName",
    });
    const formattedCampaigns = campaigns.map((campaign) => ({
      rate: campaign.BusinessRating,
      raterName: campaign.businessId.companyName,
    }));
    const influencerWithCampaigns = {
      ...influencer.toObject(),
      campaigns: formattedCampaigns,
    };

    res.json(influencerWithCampaigns);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// creating influencer
app.post("/influencers", upload.single("image"), async (req, res) => {
  Influencer.create({ ...req.body, image: req.file?.path })
    .then((influencer) =>
      // res.json({
      //   _id: influencer._id,
      //   token: generateToken(influencer._id),
      //   type: "Influencer",
      //   name: influencer.name,
      //   image: influencer.image,
      //   description: influencer.description,
      // })
      res.json({
        token: generateToken(influencer._id),
        type: "Influencer",
        ...influencer._doc,
      })
    )
    .catch((err) => res.json(err));
});
app.patch(
  "/influencers/:receiver_id",
  upload.single("image"),
  async (req, res) => {
    const { receiver_id } = req.params;
    const updates = { ...req.body, isActive: true };
    if (req.file?.path) {
      updates.image = req.file.path;
    }
    Influencer.findById(receiver_id)
      .then((influencer) => {
        Object.assign(influencer, { ...updates }); // Merge properties using spread
        return influencer.save();
      })
      .then((updatedInfluencer) => {
        console.log("Influencer updated:", updatedInfluencer);
        res.json({
          token: generateToken(influencer._id),
          type: "Influencer",
          ...updatedInfluencer._doc,
        });
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      });
  }
);
// creating business
app.post("/business", upload.single("image"), async (req, res) => {
  Business.create({ ...req.body, image: req.file?.path })
    .then((business) =>
      // res.json({
      //   _id: business._id,
      //   token: generateToken(business._id),
      //   type: "Business",
      //   name: business.companyName,
      //   image: business.image,
      //   description: business.description,
      // })
      res.json({
        token: generateToken(business._id),
        type: "Business",
        ...business._doc,
      })
    )
    .catch((err) => res.json(err));
});
// fetching all businesses
app.get(
  "/businesses",
  protect,
  asyncHandler(async (req, res) => {
    const query = businessFilters(req.query);
    try {
      const business = await Business.find(query);
      res.json(business);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
app.get(
  "/businesses/:id",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const business = await Business.findById(req.params.id);
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }
      const campaigns = await Campaign.find({
        businessId: business._id,
      }).populate({
        path: "influencerId",
        select: "name",
      });

      const formattedCampaigns = campaigns.map((campaign) => ({
        rate: campaign.influencerRating,
        raterName: campaign.influencerId.name,
      }));

      const businessWithCampaigns = {
        ...business.toObject(),
        campaigns: formattedCampaigns,
      };

      res.json(businessWithCampaigns);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
app.patch(
  "/business/:receiver_id",
  upload.single("image"),
  async (req, res) => {
    const { receiver_id } = req.params;
    const updates = { ...req.body, isActive: true };
    if (req.file?.path) {
      updates.image = req.file.path;
    }
    Business.findById(receiver_id)
      .then((business) => {
        Object.assign(business, { ...updates }); // Merge properties using spread
        return business.save();
      })
      .then((updatedBusiness) => {
        console.log("Business updated:", updatedBusiness);
        res.json({
          token: generateToken(Business._id),
          type: "Business",
          ...updatedBusiness._doc,
        });
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      });
  }
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password, type } = req.body;
    let user = undefined;

    if (type == "Influencer") {
      user = await Influencer.findOne({ email });
    } else if (type == "Business") {
      user = await Business.findOne({ email });
    } else {
      throw new Error("Invalid Type");
    }
    if (user && (await user.matchPassword(password))) {
      // res.json({
      //   _id: user._id,
      //   token: generateToken(user._id),
      //   type,
      //   name: user.name ? user.name : user.companyName,
      //   image: user.image,
      //   description: user.description,
      // });
      res.json({
        ...user._doc,
        token: generateToken(user._id),
        type,
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  })
);
// access the chat or create the chat
app.post(
  "/chat",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const { receiver_id } = req.body;
      const sender_id = req.user._id;
      const userType = req.user.type;
      if (!mongoose.isValidObjectId(receiver_id)) {
        return res.status(400).json({ message: "Invalid receiver_id" });
      }

      const searchCriteria =
        userType === "Influencer"
          ? { influencerId: sender_id, businessId: receiver_id }
          : { influencerId: receiver_id, businessId: sender_id };
      let chat = await Chat.findOne(searchCriteria).populate({
        path: userType === "Influencer" ? "businessId" : "influencerId",
        select:
          userType === "Influencer"
            ? "companyName image autoReply"
            : "name image autoReply",
      });
      if (!chat) {
        chat = await Chat.create({
          influencerId: userType === "Influencer" ? sender_id : receiver_id,
          businessId: userType === "Business" ? sender_id : receiver_id,
          messages: [],
        });
        await chat.populate({
          path: userType === "Influencer" ? "businessId" : "influencerId",
          select:
            userType === "Influencer"
              ? "companyName image autoReply"
              : "name image autoReply",
        });
      }

      const receiverName =
        userType === "Influencer"
          ? chat.businessId.companyName
          : chat.influencerId.name;
      const receiverId = userType === "Influencer" ? receiver_id : sender_id;
      const receiverImage =
        userType === "Influencer"
          ? chat.businessId.image
          : chat.influencerId.image;
      const receiverAutoReply =
        userType === "Influencer"
          ? chat.businessId.autoReply
          : chat.influencerId.autoReply;

      if (receiverAutoReply) {
        const message = await Message.create({
          sender: userType === "Influencer" ? "Business" : "Influencer",
          content: receiverAutoReply,
        });

        chat.messages.push(message._id);
        chat.lastMessage = receiverAutoReply;
        await chat.save();
      }

      const formattedChat = {
        ...chat.toObject(),
        receiverName,
        receiverId,
        receiverImage,
      };
      res.status(200).json(formattedChat);
    } catch (error) {
      console.error("Error creating/getting chat:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// get all chats for user
app.get(
  "/chat",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userType = req.user.type;
    let query = {};
    let populateOptions = {};
    let receiverIdField = "";
    let imageField = "";

    if (userType === "Influencer") {
      query = { influencerId: userId };
      populateOptions = {
        path: "businessId",
        select: "companyName image",
      };
      receiverIdField = "businessId";
      imageField = "businessId.image";
    } else if (userType === "Business") {
      query = { businessId: userId };
      populateOptions = {
        path: "influencerId",
        select: "name image",
      };
      receiverIdField = "influencerId";
      imageField = "influencerId.image";
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    try {
      const chats = await Chat.find(query)
        .populate(populateOptions)
        .populate("messages");

      const formattedChats = chats.map((chat) => {
        const receiverName =
          chat[receiverIdField].companyName || chat[receiverIdField].name;
        const receiverId = chat[receiverIdField]._id;
        const receiverImage = chat[receiverIdField].image;

        return {
          ...chat._doc,
          receiverName,
          receiverId,
          receiverImage,
        };
      });
      res.json(formattedChats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// get all messages
app.get(
  "/chat/message/:receiver_id",
  protect,
  asyncHandler(async (req, res) => {
    const sender_id = req.user._id;
    const sender_type = req.user.type;
    const { receiver_id } = req.params;

    const chatQuery = getChatQuery(sender_id, sender_type, receiver_id);

    const chat = await Chat.findOne(chatQuery).populate({
      path: "messages",
      model: "Message",
    });

    if (!chat) {
      return res.json({ message: "Chat not found." });
    }
    res.json(chat.messages);
  })
);
// send a message
app.post(
  "/chat/message/:receiver_id",
  protect,
  asyncHandler(async (req, res) => {
    const receiverId = req.params.receiver_id;
    const { content, isCondition } = req.body;

    const senderId = req.user._id;
    const senderType = req.user.type;

    const chatQuery = getChatQuery(senderId, senderType, receiverId);

    let chat = await Chat.findOne(chatQuery);

    if (!chat) {
      return res.json({ message: "Chat not found." });
    }

    const message = await Message.create({
      sender: senderType,
      content,
      isCondition,
    });

    chat.messages.push(message._id);
    chat.lastMessage = message.content;
    await chat.save();

    res.json(message);
  })
);
// delete meesage by id
app.delete(
  "/chat/message/:messageId",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const { messageId } = req.params;

      const chat = await Chat.findOneAndUpdate(
        { messages: messageId },
        { $pull: { messages: messageId } }
      );

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      await Message.findByIdAndDelete(messageId);

      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

// get all campaign for user (business or influencer)
// @get {userId, userType} = req.user
app.get(
  "/campaign",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userType = req.user.type;
    let query = campaignFilters(req.query);
    if (userType === "Influencer") {
      query.influencerId = userId;
    } else if (userType === "Business") {
      query.businessId = userId;
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }
    try {
      const campaigns = await Campaign.find(query)
        .populate("influencerId", "name image")
        .populate("businessId", "companyName image");

      const campaignsWithDetails = campaigns.map((campaign) => {
        return {
          ...campaign._doc,
          senderName:
            userType === "Influencer"
              ? campaign.influencerId.name
              : campaign.businessId.companyName,
          receiverName:
            userType === "Influencer"
              ? campaign.businessId.companyName
              : campaign.influencerId.name,
          receiverImage:
            userType === "Influencer"
              ? campaign.businessId.image
              : campaign.influencerId.image,
        };
      });
      res.json(campaignsWithDetails);
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// access or create new campaign
// @post  { receiver_id } = req.body - {sender_id,userType} = req.user
app.post(
  "/campaign",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const { campaignName, conditions, receiverId, amount, date } = req.body;
      const sender_id = req.user._id;
      const userType = req.user.type;
      if (!mongoose.isValidObjectId(receiverId)) {
        return res.status(400).json({ message: "Invalid receiver_id" });
      }

      const searchCriteria =
        userType === "Influencer"
          ? { influencerId: sender_id, businessId: receiverId }
          : { influencerId: receiverId, businessId: sender_id };

      let campaign = await Campaign.findOne(searchCriteria).populate({
        path: userType === "Influencer" ? "businessId" : "influencerId",
      });

      if (!campaign) {
        const influencerId = userType === "Influencer" ? sender_id : receiverId;
        const businessId = userType === "Business" ? sender_id : receiverId;

        campaign = await Campaign.create({
          influencerId: influencerId,
          businessId: businessId,
          campaignName: campaignName,
          conditions: conditions,
          amount: amount,
          date: date,
          status: "لم يحن الموعد",
          payment: "لم يتم الدفع",
        });
        // add campaign id to chat
        const chat = await Chat.findOne({
          influencerId: influencerId,
          businessId: businessId,
        });
        chat.campaignId = campaign._id;
        await chat.save();
      }
      res.status(200).json(campaign._id);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// get campaign from campaign id
app.get(
  "/campaign/:campaignId",
  protect,
  asyncHandler(async (req, res) => {
    const { campaignId } = req.params;
    const userType = req.user.type;

    try {
      const campaign = await Campaign.findById(campaignId)
        .populate("influencerId", "name image")
        .populate("businessId", "companyName image")
        .populate("conditions", "content");

      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found." });
      }
      const campaignWithDetails = {
        ...campaign._doc,
        senderName:
          userType === "Influencer"
            ? campaign.influencerId.name
            : campaign.businessId.companyName,
        receiverName:
          userType === "Influencer"
            ? campaign.businessId.companyName
            : campaign.influencerId.name,
        receiverImage:
          userType === "Influencer"
            ? campaign.businessId.image
            : campaign.influencerId.image,
      };
      res.json(campaignWithDetails);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// approve/reject campaign
app.patch(
  "/campaign/:campaignId",
  protect,
  asyncHandler(async (req, res) => {
    const { campaignId } = req.params;
    const { isApproved } = req.body;

    try {
      let campaign = await Campaign.findById(campaignId);

      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      const searchCriteria = {
        influencerId: campaign.influencerId._id,
        businessId: campaign.businessId._id,
      };
      let chat = await Chat.findOne(searchCriteria);
      if (isApproved) {
        campaign.isApproved = isApproved;
        await campaign.save();
        await Chat.findByIdAndDelete(chat._id);
      } else {
        await Campaign.findByIdAndDelete(campaignId);
        chat.campaignId = null;
        await chat.save();
      }
      res.json({ message: "success" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// make payment
app.patch(
  "/campaign/payment/:campaignId",
  protect,
  asyncHandler(async (req, res) => {
    const { campaignId } = req.params;
    const { paymentNote } = req.body;

    // const { paymentFile} = req.body;
    // you find it in: PaymentProcess.jsx
    // handle storing payment file in cloudinry @Abdulqader
    try {
      let campaign = await Campaign.findById(campaignId);

      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      campaign.payment = "تم التحويل، جاري التحقق";
      campaign.paymentNote = paymentNote;
      await campaign.save();
      res.json({ message: "success" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// change status
app.patch(
  "/campaign/status/:campaignId",
  protect,
  asyncHandler(async (req, res) => {
    const { campaignId } = req.params;
    const { newStatus } = req.body;

    try {
      let campaign = await Campaign.findById(campaignId);

      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      campaign.status = newStatus;
      await campaign.save();
      res.json({ message: "success" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// change rate
app.patch(
  "/campaign/rate/:campaignId",
  protect,
  asyncHandler(async (req, res) => {
    const senderType = req.user.type;

    const { campaignId } = req.params;
    const { rate } = req.body;

    try {
      let campaign = await Campaign.findById(campaignId);

      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      if (senderType === "Business") {
        campaign.influencerRating = rate;
      } else {
        campaign.BusinessRating = rate;
      }
      await campaign.save();
      res.json({ message: "success" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// report dispute
app.patch(
  "/campaign/dispute/:campaignId",
  protect,
  asyncHandler(async (req, res) => {
    const senderType = req.user.type;

    const { campaignId } = req.params;
    const { disputeDesc } = req.body;

    try {
      let campaign = await Campaign.findById(campaignId);

      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      if (senderType === "Business") {
        campaign.BusinessDispute = disputeDesc;
      } else {
        campaign.influencerDispute = disputeDesc;
      }
      await campaign.save();
      res.json({ message: "success" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// get notes
app.get(
  "/campaign/notes/:campaign_id",
  protect,
  asyncHandler(async (req, res) => {
    const { campaign_id } = req.params;

    const campaign = await Campaign.findOne({ _id: campaign_id }).populate({
      path: "notes",
      model: "Message",
    });
    if (!campaign) {
      return res.json({ message: "Campaign not found." });
    }
    res.json(campaign.notes);
  })
);

// send notes
app.post(
  "/campaign/notes/:campaign_id",
  protect,
  asyncHandler(async (req, res) => {
    const { campaign_id } = req.params;
    const { content } = req.body;

    const senderType = req.user.type;

    const campaign = await Campaign.findOne({ _id: campaign_id });

    if (!campaign) {
      return res.json({ message: "campaign not found." });
    }

    const message = await Message.create({
      sender: senderType,
      content,
    });

    campaign.notes.push(message._id);
    await campaign.save();

    res.json(message);
  })
);

app.get(
  "/admin",
  asyncHandler(async (req, res) => {
    try {
      const campaigns = await Campaign.find();

      res.json(campaigns);
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
// change payment
app.patch("/admin/payment/:campaignId", async (req, res) => {
  const { campaignId } = req.params;
  const { newPayment } = req.body;

  try {
    let campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    campaign.payment = newPayment;
    await campaign.save();
    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// clear dispute
app.patch("/admin/dispute/:campaignId", async (req, res) => {
  const { campaignId } = req.params;
  const { userType } = req.body;

  try {
    let campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    if (userType === "Business") {
      campaign.BusinessDispute = null;
    } else {
      campaign.influencerDispute = null;
    }
    await campaign.save();
    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// handle auto meesage
app.listen(3001, () => {
  console.log("server is running");
});
