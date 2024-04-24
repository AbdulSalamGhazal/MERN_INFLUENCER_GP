import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";

function Filters({ setFilters }) {
  const updateFilters = (newFilter) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };
  const [search, setSearch] = useState("");
  const handleChangeSearch = (event) => {
    let searchTerm = event.target.value;
    setSearch(searchTerm);
    updateFilters({ companyName: searchTerm });
  };
  const [industry, setIndustry] = useState([]);
  const handleChangeIndustry = (event) => {
    const {
      target: { value },
    } = event;
    let newIndustry = typeof value === "string" ? value.split(",") : value;
    setIndustry(newIndustry);
    updateFilters({ industry: newIndustry });
  };
  const [campaignGoals, setCampaignGoals] = useState([]);
  const handleChangeCampaignGoals = (event) => {
    const {
      target: { value },
    } = event;
    let newCampaignGoals = typeof value === "string" ? value.split(",") : value;
    setCampaignGoals(newCampaignGoals);
    updateFilters({ campaignGoals: newCampaignGoals });
  };

  const handleClearFilters = () => {
    setSearch("");
    setIndustry([]);
    setCampaignGoals([]);

    updateFilters({
      companyName: "",
      industry: [],
      campaignGoals: [],
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, pl: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <TextField
              value={search}
              id="outlined-basic"
              label="بحث"
              onChange={handleChangeSearch}
              fullWidth
            />
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="industry-label">المجال</InputLabel>
              <Select
                labelId="industry-label"
                id="industry"
                label="industry"
                multiple
                value={industry}
                onChange={handleChangeIndustry}
                input={<OutlinedInput label="industry" />}
              >
                <MenuItem value={"الأزياء"}>الأزياء</MenuItem>
                <MenuItem value={"الجمال"}>الجمال</MenuItem>
                <MenuItem value={"التكنولوجيا"}>التكنولوجيا</MenuItem>
                <MenuItem value={"الغذاء والمشروبات"}>
                  الغذاء والمشروبات
                </MenuItem>
                <MenuItem value={"الصحة والعافية"}>الصحة والعافية</MenuItem>
                <MenuItem value={"الترفيه"}>الترفيه</MenuItem>
                <MenuItem value={"نمط الحياة"}>نمط الحياة</MenuItem>
                <MenuItem value={"السفر والضيافة"}>السفر والضيافة</MenuItem>
                <MenuItem value={"الرياضة واللياقة البدنية"}>
                  الرياضة واللياقة البدنية
                </MenuItem>
                <MenuItem value={"التعليم والتعلم"}>التعليم والتعلم</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3} dir="rtl">
            <FormControl fullWidth dir="rtl">
              <InputLabel dir="rtl" id="campaignGoals-label">
                أهداف الحملة
              </InputLabel>
              <Select
                dir="rtl"
                labelId="campaignGoals-label"
                id="campaignGoals"
                label="campaignGoals"
                multiple
                value={campaignGoals}
                onChange={handleChangeCampaignGoals}
                input={<OutlinedInput label="campaignGoals" />}
              >
                <MenuItem value={"زيادة الوعي بالعلامة التجارية"}>
                  زيادة الوعي بالعلامة التجارية
                </MenuItem>
                <MenuItem value={"تعزيز التفاعل"}>تعزيز التفاعل</MenuItem>
                <MenuItem value={"جذب حركة المرور"}>جذب حركة المرور</MenuItem>
                <MenuItem value={"توليد العملاء المتوقعين"}>
                  توليد العملاء المتوقعين
                </MenuItem>
                <MenuItem value={"زيادة المبيعات"}>زيادة المبيعات</MenuItem>
                <MenuItem value={"الترويج لإطلاق منتج جديد"}>
                  الترويج لإطلاق منتج جديد
                </MenuItem>
                <MenuItem value={"توسيع نطاق السوق"}>توسيع نطاق السوق</MenuItem>
                <MenuItem value={"تحسين ولاء العملاء"}>
                  تحسين ولاء العملاء
                </MenuItem>
                <MenuItem value={"جمع ملاحظات العملاء"}>
                  جمع ملاحظات العملاء
                </MenuItem>
                <MenuItem value={"إنشاء محتوى مميز للعلامة التجارية"}>
                  إنشاء محتوى مميز للعلامة التجارية
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={1}>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              startIcon={<BackspaceIcon />}
              onClick={handleClearFilters}
            >
              حذف
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Filters;
