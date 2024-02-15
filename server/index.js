if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const filters = require("./functions/filters");
const Influencer = require("./models/influencer");
const Business = require("./models/business");
const asyncHandler = require("express-async-handler");
const generateToken = require("./config/generateToken");
const influencer = require("./models/influencer");
const { storage } = require('./cloudinary')
const multer = require('multer')
const upload = multer({ storage })

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
app.post("/influencers", upload.single('image'), async (req, res) => {
  console.log(req.body);
  Influencer.create({ ...req.body, image: req.file.path })
    .then((influencer) => res.json({
      _id: influencer._id,
      token: generateToken(influencer._id),
      type: 'influencer',
      name: influencer.name,
      image: influencer.image
    }))
    .catch((err) => res.json(err));
});
// creating business
app.post("/business", upload.single('image'), async (req, res) => {
  console.log(req.file);
  Business.create({ ...req.body, image: req.file.path })
    .then((business) => res.json({
      _id: business._id,
      token: generateToken(business._id),
      type: 'business',
      name: business.companyName,
      image: business.image
    }))
    .catch((err) => res.json(err));
});

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password, type } = req.body;
    console.log(email, password, type);
    let user = undefined;

    if (type == 'influencer') {
      user = await Influencer.findOne({ email });
    }
    else if (type == 'business') {
      user = await Business.findOne({ email });
      console.log('yes')
      console.log(user)
    }
    else {
      throw new Error("Invalid Type");
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        token: generateToken(user._id),
        type,
        name: user.name ? user.name : user.companyName,
        image: user.image
      });
    } else {
      throw new Error("Invalid Email or Password");
    }
  })
);

app.listen(3001, () => {
  console.log("server is running");
});
