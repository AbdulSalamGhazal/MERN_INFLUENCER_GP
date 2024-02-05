// create some seeds influencers to test in developments...
const Influencer = require("./models/influencer");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MERN_INFLUENCER_GP");

const influencers = [
  {
    name: "Ahmed Saad",
    email: "example@example.com",
    desc: "Tech gadget reviewer",
    audience: "Tech enthusiasts",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60",
    platforms: ["YouTube", "Twitter"],
    field: "Technology",
  },
  {
    name: "Saeed Yassin",
    email: "example@example.com",
    desc: "Fashion blogger",
    audience: "Fashion lovers",
    image:
      "https://images.unsplash.com/photo-1534493872551-856c2bb2279f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60",
    platforms: ["Instagram", "Blog"],
    field: "Fashion",
  },
  {
    name: "Mohammed Sami",
    email: "example@example.com",
    desc: "Fitness coach",
    audience: "Fitness enthusiasts",
    image:
      "https://images.unsplash.com/photo-1523478016374-2a27cc521718?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60",
    platforms: ["Instagram", "YouTube"],
    field: "Fitness",
  },
  {
    name: "Moteb Fahad",
    email: "example@example.com",
    desc: "Travel vlogger",
    audience: "Travelers",
    image:
      "https://images.unsplash.com/flagged/photo-1572262107271-baad9a8c8709?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI4fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    platforms: ["YouTube", "Instagram"],
    field: "Travel",
  },
  {
    name: "Salem AlHassan",
    email: "example@example.com",
    desc: "Food critic",
    audience: "Foodies",
    image:
      "https://images.unsplash.com/photo-1584518969469-c2d99c7760a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI2fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    platforms: ["Blog", "Instagram"],
    field: "Food",
  },
  {
    name: "Muthanna Al Marwani",
    email: "example@example.com",
    desc: "Digital artist",
    audience: "Art lovers",
    image:
      "https://images.unsplash.com/photo-1592961495487-805c73c22198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    platforms: ["Instagram", "Twitter"],
    field: "Art",
  },
  {
    name: "Jassim Al Mal",
    email: "example@example.com",
    desc: "Environmental activist",
    audience: "Eco-conscious individuals",
    image:
      "https://www.sbl.sa/storage/images/77741d865166a8f945cc3f68bdcda181.jpg",
    platforms: ["Twitter", "Blog"],
    field: "Environment",
  },
  {
    name: "Omar Farouq",
    email: "example@example.com",
    desc: "Startup mentor",
    audience: "Entrepreneurs",
    image: "https://thispersondoesnotexist.com/",
    platforms: ["LinkedIn", "Twitter"],
    field: "Business",
  },
  {
    name: "Moustafa Ammar",
    email: "example@example.com",
    desc: "Professional gamer",
    audience: "Gamers",
    image:
      "https://images.unsplash.com/photo-1598601982231-6646b0c3a5ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",

    platforms: ["Twitch", "YouTube"],
    field: "Gaming",
  },
  {
    name: "Abdullah alrheli",
    email: "sophia.wilson@example.com",
    desc: "Children’s book author",
    audience: "Parents and children",
    image:
      "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
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
