const express = require("express");
const mongoose = require("mongoose");
const Influencer = require("./models/influencer");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/MERN_INFLUENCER_GP");

app.post("/influencers", async (req, res) => {
  console.log(req.body);
  Influencer.create(req.body)
    .then((influencer) => res.json(influencer))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
