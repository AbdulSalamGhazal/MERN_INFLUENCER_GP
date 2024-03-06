if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const filters = require("./functions/filters");
const getChatQuery = require("./functions/getChatQuery");
const Influencer = require("./models/influencer");
const Business = require("./models/business");
const Chat = require("./models/chat");
const Message = require("./models/message");
const asyncHandler = require("express-async-handler");
const generateToken = require("./config/generateToken");
const { storage } = require("./cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const { protect } = require("./middleware/authMiddleware");
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
  const influencer = await Influencer.findById(req.params.id);
  res.json(influencer);
});

// creating influencer
app.post("/influencers", upload.single("image"), async (req, res) => {
  Influencer.create({ ...req.body, image: req.file?.path })
    .then((influencer) =>
      res.json({
        _id: influencer._id,
        token: generateToken(influencer._id),
        type: "Influencer",
        name: influencer.name,
        image: influencer.image,
        description: influencer.description,
      })
    )
    .catch((err) => res.json(err));
});
// creating business
app.post("/business", upload.single("image"), async (req, res) => {
  Business.create({ ...req.body, image: req.file?.path })
    .then((business) =>
      res.json({
        _id: business._id,
        token: generateToken(business._id),
        type: "Business",
        name: business.companyName,
        image: business.image,
        description: business.description,
      })
    )
    .catch((err) => res.json(err));
});

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
      res.json({
        _id: user._id,
        token: generateToken(user._id),
        type,
        name: user.name ? user.name : user.companyName,
        image: user.image,
        description: user.description,
      });
    } else {
      // throw new Error("Invalid Email or Password");
      return res.status(401).json({ error: 'Invalid email or password' });
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
        select: userType === "Influencer" ? "companyName" : "name",
      });

      if (!chat) {
        chat = await Chat.create({
          influencerId: userType === "Influencer" ? sender_id : receiver_id,
          businessId: userType === "Business" ? sender_id : receiver_id,
          messages: [],
        });

        // Populate the created chat with the receiver's name
        await chat.populate({
          path: userType === "Influencer" ? "businessId" : "influencerId",
          select: userType === "Influencer" ? "companyName" : "name",
        });
      }

      const receiverName =
        userType === "Influencer"
          ? chat.businessId.companyName
          : chat.influencerId.name;

      const receiverId = userType === "Influencer" ? receiver_id : sender_id;

      const formattedChat = {
        ...chat.toObject(),
        receiverName,
        receiverId,
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
    if (userType === "Influencer") {
      query = { influencerId: userId };
      populateOptions = {
        path: "businessId",
        select: "companyName",
      };
      receiverIdField = "businessId";
    } else if (userType === "Business") {
      query = { businessId: userId };
      populateOptions = {
        path: "influencerId",
        select: "name",
      };
      receiverIdField = "influencerId";
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }
    const chats = await Chat.find(query)
      .populate(populateOptions)
      .populate("messages");

    if (chats.length > 0) {
      const formattedChats = chats.map((chat) => {
        const receiverName =
          userType === "Influencer"
            ? chat.businessId.companyName
            : chat.influencerId.name;
        const receiverId = chat[receiverIdField] && chat[receiverIdField]._id;
        return {
          ...chat._doc,
          receiverName,
          receiverId,
        };
      });
      res.json(formattedChats);
    } else {
      res.json([]);
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
    const { content, type } = req.body;

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
      type: type || "Normal",
    });

    chat.messages.push(message._id);
    chat.lastMessage = message.content;
    await chat.save();

    res.json(message);
  })
);
app.listen(3001, () => {
  console.log("server is running");
});
