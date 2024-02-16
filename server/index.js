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
const influencer = require("./models/influencer");
const { storage } = require("./cloudinary");
const multer = require("multer");
const upload = multer({ storage });

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
  console.log(req.body);
  Influencer.create({ ...req.body, image: req.file.path })
    .then((influencer) =>
      res.json({
        _id: influencer._id,
        token: generateToken(influencer._id),
        type: "influencer",
        name: influencer.name,
        image: influencer.image,
      })
    )
    .catch((err) => res.json(err));
});
// creating business
app.post("/business", upload.single("image"), async (req, res) => {
  console.log(req.file);
  Business.create({ ...req.body, image: req.file.path })
    .then((business) =>
      res.json({
        _id: business._id,
        token: generateToken(business._id),
        type: "business",
        name: business.companyName,
        image: business.image,
      })
    )
    .catch((err) => res.json(err));
});

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password, type } = req.body;
    console.log(email, password, type);
    let user = undefined;

    if (type == "influencer") {
      user = await Influencer.findOne({ email });
    } else if (type == "business") {
      user = await Business.findOne({ email });
      console.log("yes");
      console.log(user);
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
      });
    } else {
      throw new Error("Invalid Email or Password");
    }
  })
);
// access the chat or create the chat
app.post(
  "/chat",
  asyncHandler(async (req, res) => {
    const { receiver_id } = req.body;
    // const sender_id = req.user._id;
    // const userType = req.user.type;
    const { sender_id, userType } = req.body; // for postman testing...

    const searchCriteria =
      userType === "influencer"
        ? { influencerId: sender_id, businessId: receiver_id }
        : { influencerId: receiver_id, businessId: sender_id };

    let chat = await Chat.findOne(searchCriteria).populate("messages");

    if (!chat) {
      chat = await Chat.create({
        influencerId: userType === "influencer" ? sender_id : receiver_id,
        businessId: userType === "business" ? sender_id : receiver_id,
        messages: [],
      });
    }

    res.json(chat);
  })
);
// get all chats for user
app.get(
  "/chat",
  asyncHandler(async (req, res) => {
    // const userId = req.user._id;
    // const userType = req.user.type;
    const { userId, userType } = req.body; // for postman testing...

    let query =
      userType === "influencer"
        ? { influencerId: userId }
        : { businessId: userId };

    const chats = await Chat.find(query)
      .populate("lastMessage")
      .populate("messages");

    if (chats.length > 0) {
      res.json(chats);
    } else {
      res.json({ message: "No chats found for the user." });
    }
  })
);
// get all messages
app.get(
  "/chat/message/:receiver_id",
  asyncHandler(async (req, res) => {
    const { receiver_id } = req.params;

    // const sender_id = req.user._id;
    // const sender_type = req.user.type;
    const { userId, userType } = req.body; // for postman testing...

    const chatQuery = getChatQuery(userId, userType, receiver_id);

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
  asyncHandler(async (req, res) => {
    const receiverId = req.params.receiver_id;
    const { content, type } = req.body;

    // const senderId = req.user._id;
    // const senderType = req.user.type;
    const { senderId, senderType } = req.body; // for postman testing...

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
    chat.lastMessage = message._id;
    await chat.save();

    res.json(message);
  })
);
app.listen(3001, () => {
  console.log("server is running");
});
