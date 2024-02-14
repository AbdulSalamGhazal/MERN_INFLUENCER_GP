const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const filters = require("./functions/filters");
const Influencer = require("./models/influencer");
const Business = require("./models/business");

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

app.post("/influencers", async (req, res) => {
  console.log(req.body);
  Influencer.create(req.body)
    .then((influencer) => res.json(influencer))
    .catch((err) => res.json(err));
});

app.post("/business", async (req, res) => {
  console.log(req.body);
  Business.create(req.body)
    .then((business) => res.json(business))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
