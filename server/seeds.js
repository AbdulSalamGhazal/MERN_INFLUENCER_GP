// create some seeds influencers to test in developments...
const Influencer = require("./models/influencer");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MERN_INFLUENCER_GP");

const influencers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    desc: "Tech gadget reviewer",
    audience: "Tech enthusiasts",
    image: "image1.jpg",
    platforms: ["YouTube", "Twitter"],
    field: "Technology",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    desc: "Fashion blogger",
    audience: "Fashion lovers",
    image: "image2.jpg",
    platforms: ["Instagram", "Blog"],
    field: "Fashion",
  },
  {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    desc: "Fitness coach",
    audience: "Fitness enthusiasts",
    image: "image3.jpg",
    platforms: ["Instagram", "YouTube"],
    field: "Fitness",
  },
  {
    name: "Samantha Brown",
    email: "samantha.brown@example.com",
    desc: "Travel vlogger",
    audience: "Travelers",
    image: "image4.jpg",
    platforms: ["YouTube", "Instagram"],
    field: "Travel",
  },
  {
    name: "Michael Lee",
    email: "michael.lee@example.com",
    desc: "Food critic",
    audience: "Foodies",
    image: "image5.jpg",
    platforms: ["Blog", "Instagram"],
    field: "Food",
  },
  {
    name: "Emily White",
    email: "emily.white@example.com",
    desc: "Digital artist",
    audience: "Art lovers",
    image: "image6.jpg",
    platforms: ["Instagram", "Twitter"],
    field: "Art",
  },
  {
    name: "David Harris",
    email: "david.harris@example.com",
    desc: "Environmental activist",
    audience: "Eco-conscious individuals",
    image: "image7.jpg",
    platforms: ["Twitter", "Blog"],
    field: "Environment",
  },
  {
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    desc: "Startup mentor",
    audience: "Entrepreneurs",
    image: "image8.jpg",
    platforms: ["LinkedIn", "Twitter"],
    field: "Business",
  },
  {
    name: "Ethan Brown",
    email: "ethan.brown@example.com",
    desc: "Professional gamer",
    audience: "Gamers",
    image: "image9.jpg",
    platforms: ["Twitch", "YouTube"],
    field: "Gaming",
  },
  {
    name: "Sophia Wilson",
    email: "sophia.wilson@example.com",
    desc: "Children’s book author",
    audience: "Parents and children",
    image: "image10.jpg",
    platforms: ["Blog", "Instagram"],
    field: "Literature",
  },
];

// Inserting the documents
Influencer.insertMany(influencers)
  .then((docs) => {
    console.log("Influencers created:", docs);
  })
  .catch((err) => {
    console.error("Error creating influencers:", err);
  });
