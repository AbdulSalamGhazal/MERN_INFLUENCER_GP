import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
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
    updateFilters({ name: searchTerm });
  };
  const [field, setField] = useState([]);
  const handleChangeField = (event) => {
    const {
      target: { value },
    } = event;
    let newField = typeof value === "string" ? value.split(",") : value;
    setField(newField);
    updateFilters({ field: newField });
  };
  const [platform, setPlatform] = useState([]);
  const handleChangePlatform = (event) => {
    const {
      target: { value },
    } = event;
    let newPlatform = typeof value === "string" ? value.split(",") : value;
    setPlatform(newPlatform);
    updateFilters({ platforms: newPlatform });
  };
  const [audience, setAudience] = useState([]);
  const handleChangeAudience = (event) => {
    const {
      target: { value },
    } = event;
    let newAudience = typeof value === "string" ? value.split(",") : value;
    setAudience(newAudience);
    updateFilters({ audience: newAudience });
  };

  const [cost, setCost] = useState([5000, 50000]);
  const handleChangeCost = (event, newCost) => {
    setCost(newCost);
    updateFilters({ avg_cost_min: newCost[0], avg_cost_max: newCost[1] });
  };

  const [followers, setFollowers] = useState("");
  const handleChangeFollowers = (event) => {
    let newFollowers = event.target.value;
    setFollowers(newFollowers);
    updateFilters({ total_followers: newFollowers });
  };
  const [location, setLocation] = useState([]);
  const handleChangeLocation = (event) => {
    const {
      target: { value },
    } = event;
    let newLocation = typeof value === "string" ? value.split(",") : value;
    setLocation(newLocation);
    updateFilters({ location: newLocation });
  };
  const [checked, setChecked] = useState(false);
  const handleChangeVerified = (event) => {
    let isVerified = event.target.checked;
    setChecked(isVerified);
    updateFilters({ verified: isVerified });
  };

  const handleClearFilters = () => {
    setSearch("");
    setField([]);
    setPlatform([]);
    setAudience([]);
    setCost([5000, 50000]);
    setFollowers("");
    setLocation([]);
    setChecked(false);

    updateFilters({
      name: "",
      field: [],
      platforms: [],
      audience: [],
      avg_cost_min: 5000,
      avg_cost_max: 50000,
      total_followers: 50000000,
      location: [],
      verified: undefined,
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
              <InputLabel id="field-label">المجال</InputLabel>
              <Select
                labelId="field-label"
                id="field"
                label="field"
                multiple
                value={field}
                onChange={handleChangeField}
                input={<OutlinedInput label="Field" />}
              >
                <MenuItem value={"الألعاب"}>الألعاب</MenuItem>
                <MenuItem value={"الجمال والمكياج"}>الجمال والمكياج</MenuItem>
                <MenuItem value={"الموضة"}>الموضة</MenuItem>
                <MenuItem value={"اللياقة البدنية والصحة"}>
                  اللياقة البدنية والصحة
                </MenuItem>
                <MenuItem value={"التكنولوجيا والأجهزة"}>
                  التكنولوجيا والأجهزة
                </MenuItem>
                <MenuItem value={"الطعام والطبخ"}>الطعام والطبخ</MenuItem>
                <MenuItem value={"السفر"}>السفر</MenuItem>
                <MenuItem value={"الحرف اليدوية والصناعات اليدوية"}>
                  الحرف اليدوية والصناعات اليدوية
                </MenuItem>
                <MenuItem value={"التربية والأسرة"}>التربية والأسرة</MenuItem>
                <MenuItem value={"نمط الحياة"}>نمط الحياة</MenuItem>
                <MenuItem value={"التعليم والتعلم"}>التعليم والتعلم</MenuItem>
                <MenuItem value={"الأعمال وريادة الأعمال"}>
                  الأعمال وريادة الأعمال
                </MenuItem>
                <MenuItem value={"التصوير الفوتوغرافي والتصوير الفيديو"}>
                  التصوير الفوتوغرافي والتصوير الفيديو
                </MenuItem>
                <MenuItem value={"الموسيقى والرقص"}>الموسيقى والرقص</MenuItem>
                <MenuItem value={"الرياضة والألعاب الرياضية"}>
                  الرياضة والألعاب الرياضية
                </MenuItem>
                <MenuItem value={"العافية والصحة العقلية"}>
                  العافية والصحة العقلية
                </MenuItem>
                <MenuItem value={"ديكور المنزل وتصميم الديكور الداخلي"}>
                  ديكور المنزل وتصميم الديكور الداخلي
                </MenuItem>
                <MenuItem value={"الفن والتصميم"}>الفن والتصميم</MenuItem>
                <MenuItem value={"العلوم والابتكار"}>العلوم والابتكار</MenuItem>
                <MenuItem value={"الاستدامة البيئية"}>
                  الاستدامة البيئية
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3} dir="rtl">
            <FormControl fullWidth dir="rtl">
              <InputLabel dir="rtl" id="platform-label">
                المنصة
              </InputLabel>
              <Select
                dir="rtl"
                labelId="platform-label"
                id="platform"
                label="Platform"
                multiple
                value={platform}
                onChange={handleChangePlatform}
                input={<OutlinedInput label="Platform" />}
              >
                <MenuItem value={"يوتيوب"}>يوتيوب</MenuItem>
                <MenuItem value={"تويتر"}>تويتر</MenuItem>
                <MenuItem value={"سناب شات"}>سناب شات</MenuItem>
                <MenuItem value={"إنستجرام"}>إنستجرام</MenuItem>
                <MenuItem value={"فيس بوك"}>فيس بوك</MenuItem>
                <MenuItem value={"تيك توك"}>تيك توك</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="audience-label">الجمهور</InputLabel>
              <Select
                labelId="audience-label"
                id="audience"
                label="audience"
                multiple
                value={audience}
                onChange={handleChangeAudience}
                input={<OutlinedInput label="audience" />}
              >
                <MenuItem value={"الموضة"}>الموضة</MenuItem>
                <MenuItem value={"التكنولوجيا"}>التكنولوجيا</MenuItem>
                <MenuItem value={"اللياقة البدنية"}>اللياقة البدنية</MenuItem>
                <MenuItem value={"الألعاب"}>الألعاب</MenuItem>
                <MenuItem value={"السفر"}>السفر</MenuItem>
                <MenuItem value={"الطعام"}>الطعام</MenuItem>
                <MenuItem value={"مشاريع DIY (افعلها بنفسك)"}>
                  مشاريع DIY (افعلها بنفسك)
                </MenuItem>
                <MenuItem value={"الترفيه"}>الترفيه</MenuItem>
                <MenuItem value={"التعليم"}>التعليم</MenuItem>
                <MenuItem value={"الاستدامة"}>الاستدامة</MenuItem>
                <MenuItem value={"الصحة والعافية"}>الصحة والعافية</MenuItem>
                <MenuItem value={"الجمال"}>الجمال</MenuItem>
                <MenuItem value={"الرياضة"}>الرياضة</MenuItem>
                <MenuItem value={"الموسيقى"}>الموسيقى</MenuItem>
                <MenuItem value={"التصوير الفوتوغرافي"}>
                  التصوير الفوتوغرافي
                </MenuItem>
                <MenuItem value={"الفن والتصميم"}>الفن والتصميم</MenuItem>
                <MenuItem value={"التمويل الشخصي"}>التمويل الشخصي</MenuItem>
                <MenuItem value={"التربية والأسرة"}>التربية والأسرة</MenuItem>
                <MenuItem value={"الأنشطة الخارجية"}>الأنشطة الخارجية</MenuItem>
                <MenuItem value={"الأدب والقراءة"}>الأدب والقراءة</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <InputLabel id="cost-label">التكلفة</InputLabel>

            <Slider
              getAriaLabel={() => "ريال"}
              value={cost}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v} ريال`}
              onChange={handleChangeCost}
              min={1000}
              step={1000}
              max={100000}
            />
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="followers-label">المتابعين</InputLabel>
              <Select
                labelId="followers-label"
                id="followers"
                label="followers"
                value={followers}
                onChange={handleChangeFollowers}
                input={<OutlinedInput label="Followers" />}
              >
                <MenuItem value={50000}> &lt; 50 ألف</MenuItem>
                <MenuItem value={100000}> &lt; 100 ألف</MenuItem>
                <MenuItem value={250000}> &lt; 250 ألف</MenuItem>
                <MenuItem value={500000}> &lt; 500 ألف</MenuItem>
                <MenuItem value={1000000}> &lt; 1 مليون</MenuItem>
                <MenuItem value={5000000}> &lt; 5 مليون</MenuItem>
                <MenuItem value={10000000}> &lt; 10 مليون</MenuItem>
                <MenuItem value={50000000}> &lt; 50 مليون</MenuItem>
              </Select>
            </FormControl>
          </Grid>{" "}
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="location-label">الموقع</InputLabel>
              <Select
                labelId="location-label"
                id="location"
                label="location"
                multiple
                value={location}
                onChange={handleChangeLocation}
                input={<OutlinedInput label="location" />}
              >
                <MenuItem value={"المنطقة الوسطى"}>
                  المنطقة الوسطى (مثل الرياض)
                </MenuItem>
                <MenuItem value={"المنطقة الغربية"}>
                  المنطقة الغربية (مثل جدة، مكة المكرمة، المدينة المنورة)
                </MenuItem>
                <MenuItem value={"المنطقة الشرقية"}>
                  المنطقة الشرقية (مثل الدمام، الخبر، الأحساء)
                </MenuItem>
                <MenuItem value={"المنطقة الجنوبية"}>
                  المنطقة الجنوبية (مثل أبها، نجران، جيزان)
                </MenuItem>
                <MenuItem value={"المنطقة الشمالية"}>
                  المنطقة الشمالية (مثل تبوك، الجوف)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2}>
            <InputLabel id="check">موثق؟</InputLabel>

            <Switch
              sx={{ ml: 4 }}
              checked={checked}
              onChange={handleChangeVerified}
            />
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
