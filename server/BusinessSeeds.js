// create some seeds influencers to test in developments...
const Business = require("./models/business");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MERN_INFLUENCER_GP");

const businesses = [
  {
    companyName: "الحسن للعود",
    industry: "الجمال",
    size: "متوسطة: 51 إلى 250 موظفاً",
    email: "alhassan@gmail.com",
    password: "123456@Ab",
    address: "الرياض",
    image:
      "https://pbs.twimg.com/profile_images/1466820962024837135/pp06zIqg_400x400.jpg",

    websiteURL: "https://salla.sa/oud.alhassan",
    socialMediaLinks: ["https://twitter.com/oudalhasan1"],
    description:
      "مؤسسة مختصة في تسويق أخشاب ودهن العود بأنواعه .. نراهن على الجودة المتوازنة مع السعر لنجعله بأيدي الجميع .. الشراء عن طريق المتجر على الرابط فقط.",

    targetAudience: ["الجمال"],
    campaignGoals: ["زيادة المبيعات", "توسيع نطاق السوق"],

    generalRequest: [
      "يجب ان يكون المعلن يرتدي الزي السعودي الرسمي",
      "يجب على المعلن عدم المطالبة بنسبة من المبيعات",
    ],
    budgetRange: {
      min: 7500,
      max: 12000,
    },
  },
  {
    companyName: "مؤسسة التميمي للمستلزمات الرياضية",
    industry: "الرياضة واللياقة البدنية",
    size: "مؤسسة: أكثر من 1000 موظف",
    email: "altamimi@gmail.com",
    password: "123456@Ab",
    address: "مكة المكرمة",
    image:
      "https://i0.wp.com/tamimigroup.com.sa/wp-content/uploads/2018/09/New-Tamimi-Group-Logo-01-01.png?fit=1024%2C873&ssl=1",

    websiteURL: "https://tamimsport.com/",
    socialMediaLinks: [
      "https://www.facebook.com/p/Tamim-Sport-100040878017549/",
      "https://twitter.com/tamimsport",
    ],
    description:
      "متجر التميمي، المؤسسة الرائدة في المنتجات الرياضية، تسوق اونلاين أحدث الملابس والأحذية الرياضية من العلامة التجارية التميمي والمنتجات الخاصة بنادي الاتحاد السعودي لكرة القدم.",

    targetAudience: [
      "اللياقة البدنية",
      "الصحة والعافية",
      "الرياضة",
      "الأنشطة الخارجية",
    ],
    campaignGoals: ["الترويج لإطلاق منتج جديد"],

    generalRequest: [
      "يجب على المعلن ارتداء الزي الرياضي الكامل من مؤسستنا",
      "يجب ان يكون المعلن لاعب في الدوري السعودي الممتاز",
    ],
    budgetRange: {
      min: 15000,
      max: 25000,
    },
  },
  {
    companyName: "مطبخ بكران",
    industry: "الغذاء والمشروبات",
    size: "صغيرة: 11 إلى 50 موظفاً",
    email: "bakran@gmail.com",
    password: "123456@Ab",
    address: "المدينة المنورة",
    image:
      "https://pbs.twimg.com/profile_images/1501846083755982855/RdjFmByG_400x400.jpg",

    websiteURL: "https://bakranrestaurant.my.taker.io/menu?language=ar",
    socialMediaLinks: [
      "https://www.instagram.com/bakran_rest/reels/?ref=14&hl=en",
      "https://twitter.com/Bakran_Rest",
    ],
    description:
      "مطاعم بكران افضل واشهر سلسلة مطاعم للمأكولات الشعبية السعودية بجودة عالية واصناف متنوعة من الوجبات والذبائح والحلويات تفضل بزيارتنا او الطلب من خلال التطبيق.",

    targetAudience: ["الطعام", "الصحة والعافية"],
    campaignGoals: ["جذب حركة المرور", "تحسين ولاء العملاء"],

    generalRequest: [
      "تصوير جميع مأكولات المطعم و اكلها خلال الاعلان",
      "يجب ان يكون المعلن من ذوي الاجسام البدينه لجلب عدد اكبر من العملاء",
    ],
    budgetRange: {
      min: 4000,
      max: 8000,
    },
  },
  {
    companyName: "مدارس الأقصى الحديثة",
    industry: "التعليم والتعلم",
    size: "شركة ناشئة: أقل من 10 موظفين",
    email: "alaqsa@gmail.com",
    password: "123456@Ab",
    address: "جدة",
    image:
      "https://pbs.twimg.com/profile_images/1496042013585723392/LCnky379_400x400.jpg",

    websiteURL: "http://alaqsa.edu.sa/",
    socialMediaLinks: [
      "https://www.youtube.com/user/aqsachannel1",
      "https://twitter.com/ALAQSA_SCH",
      "https://www.facebook.com/AqsaSchoolsKSA/",
    ],
    description:
      "المدرسة في زمن العولمة أصبحت أمام تـحـدٍ كبـيـر  يُعـتـمد عليها في تنشئة الأبناء دراسياً وسـلوكـــاً ونحن في الأقصى نحمـل هذا المنهج ونعوّل عليه ما استطعنا إلى ذلك سبيـلا نـنــتـظر مـنـكـم الــــرأي والمشورة  والدعم والعون وقبل ذلك  على الله التوكل وهو ولي التوفيق.",

    targetAudience: ["التعليم", "مشاريع DIY (افعلها بنفسك)", "الأدب والقراءة"],
    campaignGoals: ["جمع ملاحظات العملاء", "تحسين ولاء العملاء"],

    generalRequest: [
      "يجب ان يكون المعلن طالب او احد ذويه طالب في مدراس الاقصى",
      "يجب ان يكون المعلن حاصل على شهادة بدرجة ممتاز",
    ],
    budgetRange: {
      min: 3000,
      max: 5000,
    },
  },
  {
    companyName: "فنادق سويس ان تبوك",
    industry: "السفر والضيافة",
    size: "كبيرة: 251 إلى 1000 موظف",
    email: "swiss@gmail.com",
    password: "123456@Ab",
    address: "تبوك",
    image:
      "https://scontent.fmed1-1.fna.fbcdn.net/v/t39.30808-6/309200326_495667179233819_3975026588392305885_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dXZrLfKTEGgAb6Cb_iM&_nc_ht=scontent.fmed1-1.fna&oh=00_AfDRvXehl4qxK1O-0EG7O5Nh4VxLZurn9Vl9l1cyjxEIQQ&oe=662F4085",

    websiteURL: "https://swissintabuk.com/",
    socialMediaLinks: [
      "https://www.instagram.com/swissintabuk/?hl=ar",
      "https://www.facebook.com/siwss.tabuk/",
    ],
    description:
      "فنادق سويس ان تبوك هي قصة نجاح علامة فندقية سعودية يتمثل من خلالها قدرة الكفائات الوطنية على صنع كيان ناجح يقدم تجربة ممتعة وفريدة من خلال إلتزامه بالمعايير العالمية للإرتقاء بجودة الخدمات لأعلى المستويات وأن تبقى فنادق سويس ان تبوك الخيار الأمثل .",

    targetAudience: ["السفر", "الترفيه"],
    campaignGoals: ["توليد العملاء المتوقعين", "زيادة المبيعات"],

    generalRequest: [
      "يجب ان يكون المعلن مجيد لثلاثة لغات و أكثر",
      "يجب ان يكون المعلن يسكن خارج مدينة تبوك",
    ],
    budgetRange: {
      min: 20000,
      max: 50000,
    },
  },
  {
    companyName: "شركة أحمد عبد الواحد",
    industry: "التكنولوجيا",
    size: "متوسطة: 51 إلى 250 موظفاً",
    email: "abdalwahed@gmail.com",
    password: "123456@Ab",
    address: "حائل",
    image:
      "https://pbs.twimg.com/profile_images/1446122168144646148/TCGXkL4h_400x400.jpg",

    websiteURL: "https://www.abdulwahed.com/ar/",
    socialMediaLinks: [
      "https://twitter.com/abdulwahedco",
      "https://www.youtube.com/channel/UCGT1npjcGoVUdhA6gyynrxg",
      "https://www.instagram.com/ahmedabdulwahed.co/",
    ],
    description:
      "نعتقد، في شركة أحمد عبد الواحد، أن التسوّق هو أكئر من مجرد عملية شرائية، إنما هو تجربة يجب أن تكون مميزة ولذلك نعتمد على عملية الدمج بين عدّة عوامل لبلوغ هذا الهدف، كتنمية قدرات الفريق، والتأكد من جودة المنتجات بالاضافة الى مواقع المعارض المهمة و التنوّع في العلامات التجارية. كل هذا يجعل تجعل تجربة التسوق لدينا مميزة من لحظة دخول الزبون لمعارضنا لحين خروجه.",

    targetAudience: ["التكنولوجيا", "التصوير الفوتوغرافي", "الفن والتصميم"],
    campaignGoals: [
      "جمع ملاحظات العملاء",
      "إنشاء محتوى مميز للعلامة التجارية",
      "زيادة الوعي بالعلامة التجارية",
    ],

    generalRequest: [
      "ان لا يكون المعلن موظف كمصور في شركة",
      "ان يكون المعلن قد شارك في مسابقات للتصوير",
    ],
    budgetRange: {
      min: 12000,
      max: 25000,
    },
  },
  {
    companyName: "ممنون لملابس الاطفال",
    industry: "الأزياء",
    size: "صغيرة: 11 إلى 50 موظفاً",
    email: "mamnon@gmail.com",
    password: "123456@Ab",
    address: "جدة",
    image:
      "https://pbs.twimg.com/profile_images/760638462362001408/-eEaUHsY_400x400.jpg",

    websiteURL: "https://mamnonfashion.com/",
    socialMediaLinks: [
      "https://twitter.com/mamnonkids",
      "https://www.snapchat.com/add/mamnonkids",
    ],
    description:
      "ممنون هي مجموعة سعودية توفر للمجتمع السعودي والعربي كل ماهو جديد في عالم الأزياء والموضة للأطفال.في عام1998م تأسست شركة ممنون المحدودة",

    targetAudience: ["الموضة"],
    campaignGoals: [
      "جذب حركة المرور",
      "توليد العملاء المتوقعين",
      "توسيع نطاق السوق",
    ],

    generalRequest: [
      "أن يكون عمر المعلن من 7 الى 13 سنة",
      "لابد من ان يحضر المعلن ولي أمره",
    ],
    budgetRange: {
      min: 9000,
      max: 18000,
    },
  },
];

// Inserting the documents

async function createBusinesses() {
  for (const business of businesses) {
    try {
      const doc = await Business.create(business);
      console.log("Business created:", doc);
    } catch (err) {
      console.error("Error creating Business:", err);
    }
  }
}

createBusinesses();
