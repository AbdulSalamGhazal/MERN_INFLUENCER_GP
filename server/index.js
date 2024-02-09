const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const filters = require("./functions/filters");
const Influencer = require("./models/influencer");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/MERN_INFLUENCER_GP");

app.get("/influencers", async (req, res) => {
  const query = filters(req.query);
  const influencers = await Influencer.find(query);
  res.json(influencers);
});

app.post("/influencers", async (req, res) => {
  console.log(req.body);
  Influencer.create(req.body)
    .then((influencer) => res.json(influencer))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
