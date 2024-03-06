// create some seeds influencers to test in developments...
const Influencer = require("./models/influencer");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MERN_INFLUENCER_GP");

const influencers = [
  {
    name: "أحمد خالد",
    email: "example@gmail.com",
    location: "جدة",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60",
    description: "أحب استكشاف العالم ومشاركة تجربتي مع الآخرين",
    platforms: ["يوتيوب", "سناب شات"],
    field: "السفر",
    verified: true,
    avg_cost: 10000,
    password: "Aa@123456",
    special_requriements: [
      "فقط المنتجات/الخدمات المتعلقة بمجالي.",
      "لا تغطية أي مناسبات",
    ],
    personal_interests:
      "أحب السفر وعروض الطيران، أود أن أحصل على رعاية من إحدى شركات الطيران الكبرى",

    total_followers: 500000,

    audience_location: ["المنطقة الوسطى", "المنطقة الشمالية"],
    audience_age_rang: "20-40",
    audience_gender: 0.3,
    audience_interests: [
      "الموضة",
      "التكنولوجيا",
      "اللياقة البدنية",
      "الأنشطة الخارجية",
    ],

    avg_likes: 50000,
    avg_comments: 2100,
  },
  {
    name: "عمار خان",
    email: "Ammar@example.com",
    location: "الرياض",
    image:
      "https://images.unsplash.com/photo-1523478016374-2a27cc521718?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60",
    description: "مشاركة شغفي بالعيش المستدام والحلول الصديقة للبيئة.",
    platforms: ["إنستجرام", "تويتر"],
    field: "الاستدامة البيئية",
    avg_cost: 7500,
    password: "Aa@123456",
    special_requriements: [
      "علامات صديقة للبيئة فقط",
      "لا تستخدم منتجات بلاستيكية",
    ],
    personal_interests: "متحمس لإعادة التدوير والنباتية والسفر الأخضر.",

    total_followers: 350000,
    audience_location: ["المنطقة الغربية"],
    audience_age_rang: "18-35",
    audience_gender: 0.6,
    audience_interests: [
      "الاستدامة",
      "الفن والتصميم",
      "السفر",
      "الأدب والقراءة",
    ],
    avg_likes: 25000,
    avg_comments: 1200,
  },
  {
    name: "صلاح طلال",
    email: "Sal_talal155@gmail.com",
    location: "تبوك",
    image:
      "https://images.unsplash.com/photo-1623605931891-d5b95ee98459?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "أنا لاعب ألعاب فيديو مخلص من المملكة العربية السعودية، يجتاز التحديات لمتابعة شغفه بالألعاب",
    platforms: ["يوتيوب", "تيك توك", "سناب شات"],
    profiles_url: [
      "https://www.يوتيوب.com/channel/Sal_talal",
      "https://www.تيك توك.com/@Sal_talal",
      "https://www.سناب شات.com/add/sal_talal",
    ],
    field: "الألعاب",

    avg_cost: 12500,
    password: "Aa@123456",
    special_requriements: [
      "التأكد من احترام القيم الثقافية السعودية.",
      "أحب أن ألعب الألعاب باللغة العربية فقط.",
    ],
    personal_interests:
      "لاعب ألعاب فيديو سعودي متحمس لديه قاعدة جماهيرية كبيرة، جاهز لجلب علامتك التجارية إلى الحياة من خلال إعلانات مشوقة تجذب الجماهير في المملكة العربية السعودية.",

    total_followers: 789000,

    audience_location: [
      "المنطقة الشمالية",
      "المنطقة الشرقية",
      "المنطقة الوسطى",
    ],
    audience_age_rang: "13-30",
    audience_gender: 0.7,
    audience_interests: ["الألعاب", "التكنولوجيا"],

    avg_likes: 120000,
    avg_comments: 29000,
  },

  {
    name: "فيصل محمد",
    email: "Faisal.1988@hotmail.com",
    location: "الدمام",
    image:
      "https://img.freepik.com/free-photo/man-with-glasses-working-laptop_23-2148372520.jpg?w=740&t=st=1707588738~exp=1707589338~hmac=2c6fd2416049d172137119301d5d88f3b06bc3919d923c1ded7b46381e2e7f12",

    description:
      "أنا فيصل، متحمس للتكنولوجيا في المملكة العربية السعودية، مهتم بأحدث التقنيات والأجهزة، وأقود بشغف للابتكار ومخلص لاستغلال التكنولوجيا لتشكيل مستقبل أفضل لبلدنا.",
    platforms: ["تويتر", "فيس بوك"],
    profiles_url: [
      "https://twitter.com/Faisal_tech",
      "https://www.فيس بوك.com/faisaltech/",
    ],
    field: "التكنولوجيا والأجهزة",

    avg_cost: 6000,
    password: "Aa@123456",
    special_requriements: [
      "التأكد من أن التقنيات تعمل بشكل صحيح وأصلية وذات جودة ممتازة.",
      "التأكد من أن التكنولوجيا تتوافق مع اللوائح والقوانين في المملكة العربية السعودية.",
    ],

    personal_interests:
      "متحمس لثورة التكنولوجيا في المملكة العربية السعودية، أحب صناعة إعلانات مشوقة لتلهم الابتكار وتثير الفضول حول التكنولوجيا على نطاق وطني.",

    total_followers: 210000,

    audience_location: ["المنطقة الجنوبية", "المنطقة الشرقية"],
    audience_age_rang: "20-54",
    audience_gender: 0.4,
    audience_interests: ["التكنولوجيا"],

    avg_likes: 18000,
    avg_comments: 800,
  },
  {
    name: "سارة حسن",
    email: "soso.model@gmail.com",
    location: "أبها",
    image:
      "https://img.freepik.com/free-photo/good-looking-girl-with-gentle-smile-looks-gladfully-device-screen-wears-rectangular-spectacles-silk-veil-extends-hand-making-nice-shot-has-manicure-dressed-pink-jumper-isolated-blue_273609-26313.jpg?size=626&ext=jpg&ga=GA1.2.1831567758.1707588379&semt=ais",
    description:
      "أنا سارة، مؤثرة في مجال الجمال والتجميل في المملكة العربية السعودية، تعرض أسلوبها الفريد والأنيق على وسائل التواصل الاجتماعي. تلهم العديد من النساء الشابات للتعبير عن أنفسهن من خلال الملابس والإكسسوارات، مع احترام ثقافتهن وتقاليدهن.",
    platforms: ["سناب شات", "إنستجرام"],
    profiles_url: [
      "https://www.سناب شات.com/add/soso_model",
      "https://www.إنستجرام.com/soso_model/",
    ],
    field: "الموضة",

    avg_cost: 21000,
    password: "Aa@123456",
    special_requriements: [
      "يجب أن تكون الفساتين متواضعة ومناسبة للنساء المسلمات",
      "يتم التقاط جميع الصور بالحجاب",
      "أحب إنشاء حملات إعلانية للعلامات التجارية العالمية",
    ],
    personal_interests:
      "أنا متحمسة للموضة وأحب استكشاف أحدث الاتجاهات والأنماط في المملكة العربية السعودية. أعجب بعمل المصممين الدوليين الذين يقدمون أحدث الاتجاهات المناسبة للفتيات السعوديات.",

    total_followers: 1400000,

    audience_location: [
      "المنطقة الوسطى",
      "المنطقة الغربية",
      "المنطقة الجنوبية",
    ],
    audience_age_rang: "16-44",
    audience_gender: 0.1,

    audience_interests: ["الموضة", "الجمال"],

    avg_likes: 900000,
    avg_comments: 130000,
  },
  {
    name: "أكرم أنس",
    email: "Akram9@gmail.com",
    location: "مكة",
    image:
      "https://img.freepik.com/free-photo/male-soccer-player-with-ball-grass-field_23-2150821526.jpg?size=626&ext=jpg&ga=GA1.2.1831567758.1707588379&semt=ais",
    description:
      "أنا أكرم لاعب كرة قدم متحمس وموهوب يحب اللعبة. يلعب كمهاجم لناديه المحلي ويحلم بأن يصبح محترفًا في يوم من الأيام.",
    platforms: ["تويتر", "سناب شات"],
    profiles_url: [
      "https://twitter.com/Akram9",
      "https://www.سناب شات.com/add/Akram9",
    ],
    field: "الرياضة والألعاب الرياضية",
    verified: true,

    avg_cost: 10000,
    password: "Aa@123456",
    special_requriements: [
      "فهم واحترام الثقافة السعودية والتقاليد والقيم.",
      "تخصيص 20٪ من أرباح الإعلان لي",
    ],
    personal_interests:
      "كلاعب كرة قدم محترف وعاشق للعبة، أستمتع بمشاركة مهاراتي وتجاربي مع الآخرين. أنا مهتم بصنع إعلانات تعزز كرة القدم وتلهم المواهب الشابة وتعرض جمال المملكة العربية السعودية.",

    total_followers: 520000,

    audience_location: ["المنطقة الغربية"],

    audience_age_rang: "15-60",
    audience_gender: 0.85,
    audience_interests: [
      "الرياضة",
      "الصحة والعافية",
      "اللياقة البدنية",
      "الأنشطة الخارجية",
    ],

    avg_likes: 60000,
    avg_comments: 15000,
  },
  {
    name: "سلمى خالد",
    email: "chef.salmah@hotmail.com",
    location: "الرياض",
    image:
      "https://img.freepik.com/free-photo/smiley-female-chef-holding-dishes-both-hands_23-2148491280.jpg?size=626&ext=jpg&ga=GA1.1.1831567758.1707588379&semt=ais",
    description:
      "أنا شيف سعودية مشهورة وشخصية تلفزيونية، وقد حصلت على العديد من الجوائز لتميزي الطهي. أنا معروفة بفني الطهي، ودمج التقاليد، والأطباق الإبداعية التي تبرز مهارتي في مختلف المأكولات.",
    platforms: ["فيس بوك", "يوتيوب"],
    profiles_url: [
      "https://www.فيس بوك.com/ChefSalmah/",
      "https://www.يوتيوب.com/channel/ChefSalmah",
    ],
    field: "الطعام والطهي",

    avg_cost: 5000,
    password: "Aa@123456",
    special_requriements: [
      "يجب أن تكون الوجبات أو الأطباق التي أنشئ حملة إعلانية لها صحية",
    ],
    personal_interests:
      "أحب عمل برامج الطبخ على القنوات السعودية الأشهر، وأحب بشكل خاص تقديم برنامج طبخ يومي خلال شهر رمضان، وأمنيتي تقديم برنامج طبخ دولي.",

    total_followers: 110000,

    audience_location: ["المنطقة الوسطى", "المنطقة الشمالية"],
    audience_age_rang: "21-55",
    audience_gender: 0.3,

    audience_interests: ["الطعام", "اللياقة البدنية"],

    avg_likes: 8000,
    avg_comments: 700,
  },
  {
    name: "هاشم أحمد",
    email: "Abo.alhish22@gmail.com",
    location: "الأحساء",
    image:
      "https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "معروف بعمله في كل من التصوير الفوتوغرافي والفيديو، حيث يلتقط بسلاسة جوهر الحياة من خلال عدسته، ويخلق سرديات بصرية لا تنسى تتر resonat مع الجماهير في جميع أنحاء المملكة العربية السعودية.",
    platforms: ["تيك توك", "إنستجرام"],
    profiles_url: [
      "https://www.تيك توك.com/@abo_alhish",
      "https://www.إنستجرام.com/abo_alhish/",
    ],
    field: "التصوير الفوتوغرافي والفيديو",

    avg_cost: 9000,
    password: "Aa@123456",
    special_requriements: [
      "تجهيز المنطقة بأكملها جاهزة للتصوير قبل الوصول إلى الموقع",
      "إصدار جميع التراخيص والتصاريح المطلوبة من الحكومة للتصوير وتحمل التكاليف",
    ],
    personal_interests:
      "أعمل في شركة متخصصة في التصوير الفوتوغرافي، وأحب عملي الحر في التصوير الفوتوغرافي، وأطمح إلى إنشاء شركة متخصصة في مجال التصوير.",

    total_followers: 390000,

    audience_location: [
      "المنطقة الشرقية",
      "المنطقة الشمالية",
      "المنطقة الجنوبية",
    ],
    audience_age_rang: "18-40",
    audience_gender: 0.55,
    audience_interests: ["الترفيه", "التصوير الفوتوغرافي", "التكنولوجيا"],

    avg_likes: 25000,
    avg_comments: 2000,
  },
  {
    name: "حنان بسل",
    email: "Hanan.ba@hotmail.com",
    location: "جدة",
    image:
      "https://img.freepik.com/free-photo/teenager-girl-wearing-blue-posing-with-smoothie_23-2148645047.jpg?size=626&ext=jpg&ga=GA1.2.1831567758.1707588379&semt=ais",
    description:
      "أنا شخصية اجتماعية ومشهورة على وسائل التواصل الاجتماعي ومؤثرة في مجال الجمال الذي ارتقت إلى الشهرة بفضل تحولات المكياج المذهلة والدروس التعليمية. أنا معروفة بإطلالاتي الإبداعية والملونة، بالإضافة إلى تعاوناتي مع الشخصيات الشهيرة والعلامات التجارية.",
    platforms: ["يوتيوب", "تيك توك"],
    profiles_url: [
      "https://www.يوتيوب.com/channel/Hanan_makeup",
      "https://www.تيك توك.com/@Hanan_makeup",
    ],
    field: "الجمال والمكياج",

    avg_cost: 10000,
    password: "Aa@123456",
    special_requriements: [
      "يجب تقديم الأموال الإعلانية قبل الحضور",
      "يجب أن تكون المنتجات المستخدمة في الإعلانات أصلية ومن علامات تجارية عالمية",
    ],
    personal_interests:
      "أنا فنانة مكياج متحمسة أحب صنع إطلالات رائعة لمناسبات مختلفة وشخصيات متنوعة. لدي خبرة في العمل مع مختلف العلامات التجارية والشخصيات العامة لتحقيق النجاح والتأثير في مجال الجمال.",

    total_followers: 670000,

    audience_location: ["المنطقة الغربية"],
    audience_age_rang: "16-40",
    audience_gender: 0.1,

    audience_interests: ["الجمال", "الموضة"],

    avg_likes: 75000,
    avg_comments: 9000,
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
