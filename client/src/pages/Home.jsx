import { Grid, Typography } from "@mui/material";
// import Logo1 from './logo1.png'; // استبدل بمسار صورة الشعار الأول
// import Logo2 from './logo2.png'; // استبدل بمسار صورة الشعار الثاني
// import Logo3 from './logo3.png'; // استبدل بمسار صورة الشعار الثالث

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        مرحبًا بك في موقعنا للحملات الإعلانية مع المشاهير
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4}>
          <img
            src="https://pngimg.com/d/square_PNG35.png"
            alt="الشعار الأول"
            style={{ maxWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src="https://pngimg.com/d/square_PNG35.png"
            alt="الشعار الثاني"
            style={{ maxWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src="https://pngimg.com/d/square_PNG35.png"
            alt="الشعار الثالث"
            style={{ maxWidth: "100%" }}
          />
        </Grid>
      </Grid>
      <Typography variant="body1" gutterBottom>
        يساعد موقعنا في ربط المشاهير مع أصحاب العمل لإنشاء الحملات الإعلانية.
        لدينا ثلاث بوابات رئيسية:
      </Typography>
      <Typography variant="body1" gutterBottom>
        1. المشاهير: يمكن لأصحاب العمل البحث والتصفية وعرض المعلومات الكاملة
        والتواصل مع المشاهير المناسبين.
      </Typography>
      <Typography variant="body1" gutterBottom>
        2. المحادثات: يمكن لأصحاب العمل التواصل مع المشاهير للتفاوض على التكلفة
        ومحتوى الحملة.
      </Typography>
      <Typography variant="body1" gutterBottom>
        3. الحملات: بعد التوافق، يتم عرض الحملات ليتمكن أصحاب العمل والمشاهير من
        مراقبة تقدم الحملة.
      </Typography>
    </div>
  );
}

export default Home;
