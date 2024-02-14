const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const filters = require("./functions/filters");
const Influencer = require("./models/influencer");
const Business = require("./models/business");
const asyncHandler = require("express-async-handler");
const generateToken = require("./config/generateToken");
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
app.post("/influencers", async (req, res) => {
  console.log(req.body);
  Influencer.create(req.body)
    .then((influencer) => res.json(influencer)) // return only _id, token, type
    .catch((err) => res.json(err));
});
// creating business
app.post("/business", async (req, res) => {
  console.log(req.body);
  Business.create(req.body)
    .then((business) => res.json(business)) // return only _id, token, type
    .catch((err) => res.json(err));
});

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body; // also will have type as string
    console.log(email, password);
    const influencer = await Influencer.findOne({ email });

    if (influencer && (await influencer.matchPassword(password))) {
      console.log("success");
      res.json({
        _id: influencer._id,
        token: generateToken(influencer._id),
        // also return the type of the user
      });
    } else {
      throw new Error("Invalid Email or Password");
    }
  })
);

app.listen(3001, () => {
  console.log("server is running");
});
