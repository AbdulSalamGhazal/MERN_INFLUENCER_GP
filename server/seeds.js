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
    verified: true,
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
  {
    name: "Salah Talal",
    email: "Sal_talal155@gmail.com",
    location: "Tabuk",
    image:
      "https://images.unsplash.com/photo-1623605931891-d5b95ee98459?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "I am a dedicated gamer from Saudi Arabia, navigating through challenges to pursue my passion for gaming while actively engaging in the local gaming community, aiming to elevate esports in my country.",
    platforms: ["YouTube", "TikTok", "Snapchat"],
    profiles_url: [
      "https://www.youtube.com/channel/Sal_talal",
      "https://www.tiktok.com/@Sal_talal",
      "https://www.snapchat.com/add/sal_talal",
    ],
    field: "Gaming",

    avg_cost: 12500,

    special_requriements: [
      "Ensure it respects Saudi cultural values.",
      "I just like to play games in Arabic language.",
    ],
    personal_interests:
      "Passionate Saudi gamer with a big fanbase, ready to bring your brand to life through engaging ads that captivate audiences in Saudi Arabia.",

    total_followers: 789000,

    audience_location: ["Northern", "Eastern", "Central"],
    audience_age_rang: "13-30",
    audience_gender: 0.7,
    audience_interests: ["Gaming", "Technology"],

    avg_likes: 120000,
    avg_comments: 29000,
  },

  {
    name: "Faisal Mohammed",
    email: "Faisal.1988@hotmail.com",
    location: "Dammam",
    image:
      "https://img.freepik.com/free-photo/man-with-glasses-working-laptop_23-2148372520.jpg?w=740&t=st=1707588738~exp=1707589338~hmac=2c6fd2416049d172137119301d5d88f3b06bc3919d923c1ded7b46381e2e7f12",

    description:
      "I am Faisal, a technology enthusiast in the Kingdom of Saudi Arabia, interested in the latest technologies and devices, driven by a passion for innovation and dedicated to leveraging technology to shape a brighter future for our nation.",
    platforms: ["X (twitter)", "Facebook"],
    profiles_url: [
      "https://twitter.com/Faisal_tech",
      "https://www.facebook.com/faisaltech/",
    ],
    field: "Technology and Gadgets",

    avg_cost: 6000,

    special_requriements: [
      "Ensuring that the techniques work properly and are original and of excellent quality.",
      "Ensure that the technology complies with regulations and laws in Saudi Arabia.",
    ],

    personal_interests:
      "Passionate about revolutionizing technology in Saudi Arabia, I love crafting engaging ads to inspire innovation and spark curiosity about technology nationwide.",

    total_followers: 210000,

    audience_location: ["Southern", "Eastern"],
    audience_age_rang: "20-54",
    audience_gender: 0.4,
    audience_interests: ["Technology"],

    avg_likes: 18000,
    avg_comments: 800,
  },
  {
    name: "Sarah Hassan",
    email: "soso.model@gmail.com",
    location: "Abha",
    image:
      "https://img.freepik.com/free-photo/good-looking-girl-with-gentle-smile-looks-gladfully-device-screen-wears-rectangular-spectacles-silk-veil-extends-hand-making-nice-shot-has-manicure-dressed-pink-jumper-isolated-blue_273609-26313.jpg?size=626&ext=jpg&ga=GA1.1.1831567758.1707588379&semt=ais",
    description:
      "I'm Sarah, a famous fashion influencer in Saudi Arabia, who showcases her unique and elegant style on social media. She inspires many young women to express themselves through clothing and accessories, while respecting their culture and traditions.",
    platforms: ["Snapchat", "Instagram"],
    profiles_url: [
      "https://www.snapchat.com/add/soso_model",
      "https://www.instagram.com/soso_model/",
    ],
    field: "Fashion",

    avg_cost: 21000,

    special_requriements: [
      "The dress must be modest and appropriate for Muslim women",
      "All photos are taken with a hijab",
      "I like creating campaigns for international brands",
    ],
    personal_interests:
      "I am passionate about fashion and love exploring the latest trends and styles in Saudi Arabia. I admire the work of international designers who present the latest trends suitable for Saudi girls.",

    total_followers: 1400000,

    audience_location: ["Central", "Western", "Southern"],
    audience_age_rang: "16-44",
    audience_gender: 0.1,

    audience_interests: ["Fashion", "Beauty"],

    avg_likes: 900000,
    avg_comments: 130000,
  },
  {
    name: "Akram Anas",
    email: "Akram9@gmail.com",
    location: "Makkah",
    image:
      "https://img.freepik.com/free-photo/male-soccer-player-with-ball-grass-field_23-2150821526.jpg?size=626&ext=jpg&ga=GA1.2.1831567758.1707588379&semt=ais",
    description:
      "I'm Akram a passionate and talented football player who loves the game. He plays as a striker for his local club and dreams of becoming a professional one day.",
    platforms: ["X (twitter)", "Snapchat"],
    profiles_url: [
      "https://twitter.com/Akram9",
      "https://www.snapchat.com/add/Akram9",
    ],
    field: "Sports and Athletics",
    verified: true,

    avg_cost: 10000,

    special_requriements: [
      "Understanding and respect for Saudi Arabian culture, traditions, and values.",
      "Allocate 20% of advertising profits to me",
    ],
    personal_interests:
      "As a professional soccer player and a passionate fan of the sport, I enjoy sharing my skills and experiences with others. I am interested in making ads that promote soccer, inspire young talents, and showcase the beauty of Saudi Arabia.",

    total_followers: 520000,

    audience_location: ["Western"],

    audience_age_rang: "15-60",
    audience_gender: 0.85,
    audience_interests: [
      "Sports",
      "Health and Wellness",
      "Fitness",
      "Outdoor Activities",
    ],

    avg_likes: 60000,
    avg_comments: 15000,
  },
  {
    name: "Salmah Khaled",
    email: "chef.salmah@hotmail.com",
    location: "Riyadh",
    image:
      "https://img.freepik.com/free-photo/smiley-female-chef-holding-dishes-both-hands_23-2148491280.jpg?size=626&ext=jpg&ga=GA1.1.1831567758.1707588379&semt=ais",
    description:
      "I am a famous Saudi chef, restaurateur, and television personality, and I have won many awards for my culinary excellence. I am known for my culinary artistry, blending tradition, and creative dishes that showcase my prowess in various cuisines.",
    platforms: ["Facebook", "YouTube"],
    profiles_url: [
      "https://www.facebook.com/ChefSalmah/",
      "https://www.youtube.com/channel/ChefSalmah",
    ],
    field: "Food and Cooking",

    avg_cost: 5000,

    special_requriements: [
      "The meals or dishes for which I create an advertising campaign must be healthy",
    ],
    personal_interests:
      "I love making cooking programs on the most famous Saudi channels, and I especially love presenting a cooking program every day during Ramadan, and my hope is to present one of the international cooking programs.",

    total_followers: 110000,

    audience_location: ["Central", "Northern"],
    audience_age_rang: "21-55",
    audience_gender: 0.3,

    audience_interests: ["Food", "Fitness"],

    avg_likes: 8000,
    avg_comments: 700,
  },
  {
    name: "Hashim Ahmed",
    email: "Abo.alhish22@gmail.com",
    location: "Al-Ahsa",
    image:
      "https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "I am known for my work in both photography and video, seamlessly capturing the essence of life through my lens, creating timeless visual narratives that resonate deeply with audiences across Saudi Arabia.",
    platforms: ["TikTok", "Instagram"],
    profiles_url: [
      "https://www.tiktok.com/@abo_alhish",
      "https://www.instagram.com/abo_alhish/",
    ],
    field: "Photography and Videography",

    avg_cost: 9000,

    special_requriements: [
      "Prepare the entire area ready for filming before arriving at the site",
      "Issuing all licenses and permits required by the government for filming and bearing the costs",
    ],
    personal_interests:
      "I work in a company specializing in photography, and I love my own freelance photography work, and I aspire to create a company specializing in the field of photography.",

    total_followers: 390000,

    audience_location: ["Eastern", "Northern", "Southern"],
    audience_age_rang: "18-40",
    audience_gender: 0.55,
    audience_interests: ["Entertainment", "Photography", "Technology"],

    avg_likes: 25000,
    avg_comments: 2000,
  },
  {
    name: "Hanan Bassel",
    email: "Hanan.ba@hotmail.com",
    location: "Jeddah",
    image:
      "https://img.freepik.com/free-photo/teenager-girl-wearing-blue-posing-with-smoothie_23-2148645047.jpg?size=626&ext=jpg&ga=GA1.2.1831567758.1707588379&semt=ais",
    description:
      "I'm a social media celebrity and beauty influencer who rose to fame thanks to my amazing makeup transformations and tutorials. I am known for my creative and colorful looks, as well as my collaborations with celebrities and brands.",
    platforms: ["YouTube", "TikTok"],
    profiles_url: [
      "https://www.youtube.com/channel/Hanan_makeup",
      "https://www.tiktok.com/@Hanan_makeup",
    ],
    field: "Beauty and Makeup",

    avg_cost: 10000,

    special_requriements: [
      "Advertising funds must be submitted prior to attendance",
      "The products used in advertisements must be original and from international brands",
    ],
    personal_interests:
      "I am a passionate makeup artist who loves to create stunning looks for different occasions and personalities. I have experience working with various brands and celebrities in Saudi Arabia, and I want to use my skills and creativity to produce captivating ads that showcase the beauty of makeup.",

    total_followers: 450000,

    audience_location: ["Western", "Central"],
    audience_age_rang: "15-40",
    audience_gender: 0.05,
    audience_interests: ["Beauty", "Fashion"],

    avg_likes: 38000,
    avg_comments: 3400,
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
