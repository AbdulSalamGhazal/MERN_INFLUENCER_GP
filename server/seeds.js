// create some seeds influencers to test in developments...
const Influencer = require("./models/influencer");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MERN_INFLUENCER_GP");

const influencers = [
  {
    name: "Ahmed Khaled",
    email: "example@gmail.com",
    location: "Jeddah",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60",
    description:
      "I love to explor the world and share my experience with others",
    platforms: ["YouTube", "Snapchat"],
    field: "Travel",

    avg_cost: 10000,

    special_requriements: [
      "Only products/services related to my field.",
      "Don't cover any events",
    ],
    personal_interests:
      "I love traveling and airlines offers, I would love to get sponsor by one of the major airline company ",

    total_followers: 500000,

    audience_location: ["Central", "Northern"],
    audience_age_rang: "20-40",
    audience_gender: 0.3,
    audience_interests: [
      "Fashion",
      "Technology",
      "Fitness",
      "Outdoor Activities",
    ],

    avg_likes: 50000,
    avg_comments: 2100,
  },
  {
    name: "Ammar khan",
    email: "Ammar@example.com",
    location: "Riyadh",
    image:
      "https://images.unsplash.com/photo-1523478016374-2a27cc521718?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60",
    description:
      "Sharing my passion for sustainable living and eco-friendly solutions.",
    platforms: ["Instagram", "X (twitter)"],
    field: "Environmental Sustainability",
    avg_cost: 7500,
    special_requriements: ["Eco-friendly brands only", "No plastic products"],
    personal_interests:
      "Passionate about recycling, veganism, and green travel.",
    total_followers: 350000,
    audience_location: ["Western"],
    audience_age_rang: "18-35",
    audience_gender: 0.6,
    audience_interests: [
      "Sustainability",
      "Art and Design",
      "Travel",
      "Literature and Reading",
    ],
    avg_likes: 25000,
    avg_comments: 1200,
  },

  // {
  //   name: "String",
  //   email: "example@gmail.com",
  //   location: "String",
  //   image:"",
  //   description: "String",
  //   platforms: ["String"],
  //   field: "String",

  //   avg_cost: ,

  //   special_requriements: ["String"],
  //   personal_interests: "String",

  //   total_followers: ,

  //   audience_location: ["String"],
  //   audience_age_rang: "String",
  //   audience_gender: ,
  //   audience_interests: ["String"],

  //   avg_likes: ,
  //   avg_comments: ,
  // },

  // image:"https://images.unsplash.com/flagged/photo-1572262107271-baad9a8c8709?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI4fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",

  // image:"https://images.unsplash.com/photo-1584518969469-c2d99c7760a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI2fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  // image:"https://images.unsplash.com/photo-1592961495487-805c73c22198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",

  // image:"https://www.sbl.sa/storage/images/77741d865166a8f945cc3f68bdcda181.jpg",

  // image:"https://images.unsplash.com/photo-1598601982231-6646b0c3a5ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  // image:"https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
];

// Inserting the documents
Influencer.insertMany(influencers)
  .then((docs) => {
    console.log("Influencers created:", docs);
  })
  .catch((err) => {
    console.error("Error creating influencers:", err);
  });
