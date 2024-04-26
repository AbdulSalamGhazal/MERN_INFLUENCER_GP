import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import patterns from "../utils/patterns";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import PlatformInput from "../components/signup/PlatformInput";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { audienceInterests, audienceLocations, influencerFields } from "../utils/lists";

const MyAccountInfluencer = ({ user }) => {

  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [age, setAge] = useState([10, 30])
  const [genderPercent, setGenderPercent] = useState(50);
  const [image, setImage] = useState('');

  const { login } = useAuth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3001/influencers/${user._id}`
  //       );
  //       setInfluencer(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [user._id]);


  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      influencer: {...user, image:undefined}
    }
  });

  const {
    fields: platforms,
    append: appendPlatform,
    remove: removePlatform } = useFieldArray({
      control,
      name: 'influencer.platforms', // unique name for your Field Array
      rules: { minLength: 1 }
    });
  const {
    fields: specialRequriements,
    append: appendSpecialRequriements,
    remove: removeSpecialRequriements } = useFieldArray({
      control,
      name: 'influencer.special_requriements', // unique name for your Field Array
    });

  const onSubmit = async (data) => {
    setWaiting(true)
    const influencer = {
      ...data.influencer,
      image: data.influencer.image[0],
      audience_age_rang: `${age[0]}-${age[1]}`,
      audience_gender: genderPercent,
    };
    try {
      const { data } = await axios.patch(
        `http://localhost:3001/influencers/${user._id}`,
        influencer,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      login(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      // navigate("/");
      setSuccessAlert('تم تحديث المعلومات بنجاح')
      setTimeout(() => {
        setSuccessAlert(null);
      }, 3000);
      setWaiting(false)
    } catch (error) {
      setWaiting(false)
      console.error("Error fetching data:", error);
      setErrorAlert('حدث خطأ حاول مجدد');
      setTimeout(() => {
        setErrorAlert(null);
      }, 3000);
    }
  };

  console.log(watch())
  return (

    <Box>
      {/* {
        <Alert
        severity="error"
          sx={{ visibility: errorAlert == null ? "hidden" : "vislible" }}
        >
          {errorAlert}
          </Alert>
      } */}
      {/* <Typography component="h1" variant="h3" align="center">
        انضمام صاحب عمل
      </Typography> */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      // sx={{ mt: 1, maxWidth: "500px", mx: "auto" }}
      >
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Divider sx={{ my: 1, fontSize: '.75em' }}>
              المعلومات الشخصية
            </Divider>
          </Grid>
          <Grid xs={4}>
            <TextField
              fullWidth
              disabled
              dir="ltr"
              size="small"
              margin="dense"
              required
              label="البريد الالكتروني"
              autoComplete="email"
              {...register("influencer.email", {
                required: "هذا الحقل مطلوب",
                pattern: {
                  value: patterns.emailPattern,
                  message: "غير صالح",
                },
              })}
              error={errors?.influencer?.email != undefined}
              helperText={errors?.influencer?.email?.message}
            />
          </Grid>

          <Grid xs={4}>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              required
              label="الاسم"
              autoComplete="name"
              {...register("influencer.name", {
                required: "هذا الحقل مطلوب",
              })}
              error={errors?.influencer?.name != undefined}
              helperText={errors?.influencer?.name?.message}
            />
          </Grid>
          <Grid xs={4}>
            <Controller
              name="influencer.field"
              control={control}
              defaultValue={watch('influencer.field')}
              required
              render={({ field }) => (
                <TextField
                  {...register("influencer.field", {
                    required: "هذا الحقل مطلوب",
                  })}
                  error={errors?.influencer?.field != undefined}
                  helperText={errors?.influencer?.field?.message}
                  margin="dense"
                  select
                  size="small"
                  fullWidth
                  label="المجال"
                  {...field}
                >
                  {influencerFields.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              margin="dense"
              size="small"
              fullWidth
              label="حدد صورة حسابك"
              type="file"
              // name='image'
              // onChange={e => setImage(e.target.files[0])}
              // value={image}
              InputLabelProps={{ shrink: true }}
              {...register('influencer.image', { required: false })}
              error={errors?.influencer?.image != undefined}
              helperText={errors?.influencer?.image?.message}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              required
              label="مكان الاقامة"
              {...register("influencer.location")}
              error={errors?.influencer?.location != undefined}
              helperText={errors?.influencer?.location?.message}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              margin="dense"
              size="small"
              fullWidth
              multiline
              label="كيف تصف نفسك"
              type="text"
              {...register('influencer.description')}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              margin="dense"
              size="small"
              fullWidth
              multiline
              label="ما هي اهتماماتك"
              type="text"
              {...register('influencer.personal_interests')}
            />
          </Grid>
          <Grid xs={12}>
            <Divider sx={{ my: 1, fontSize: '.75em' }}>
              حسابات التوااصل الاجتماعي
            </Divider>
          </Grid>
          <Grid xs={12}>
            {platforms.map((platform, index) => (
              <PlatformInput
                dir='ltr'
                key={platform.id} // important to include key with platform's id
                {...register(`influencer.platforms.${index}`, {
                  required: platforms.length === 1 ? 'يجب ان تضيف حسابا واحدا على الاقل' : 'يجب ملئ هذا الحقل او حذفه',
                  pattern: {
                    value: patterns.platformsPattern,
                    message: 'غير صالح'
                  }
                })}
                error={errors?.influencer?.platforms && Boolean(errors?.influencer?.platforms)}
                helperText={errors?.influencer?.platforms && errors?.influencer?.platforms[index]?.message}
                margin="dense"
                size='small'
                label='حسابك في احد منصات التواصل الاجتماعي'
                required
                fullWidth
                handleDelete={() => removePlatform(index)}
                removable={platforms.length > 1}
                link={watch(`platforms.${index}`) || ''}
              />
            ))}
            <IconButton onClick={() => appendPlatform(' ')} color="primary" aria-label="add field">
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid xs={12}>
            <Divider sx={{ my: 1, fontSize: '.75em' }}>
              معلومات الجمهور
            </Divider>
          </Grid>
          <Grid xs={4}>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              required
              label="عدد المتابعين"
              autoComplete="name"
              {...register("influencer.total_followers", {
                required: "هذا الحقل مطلوب",
              })}
              error={errors?.influencer?.total_followers != undefined}
              helperText={errors?.influencer?.total_followers?.message}
            />
          </Grid>
          <Grid xs={4}>
            <Controller
              name="influencer.audience_interests"
              control={control}
              defaultValue={watch('influencer.audience_interests')}
              required
              render={({ field }) => (

                <TextField
                  fullWidth
                  size="small"
                  margin="dense"
                  label="اهتمامات المتابعين"
                  {...register("influencer.audience_interests", {
                    required: "هذا الحقل مطلوب",
                  })}
                  error={errors?.influencer?.audience_interests != undefined}
                  helperText={errors?.influencer?.audience_interests?.message}
                  select
                  multiple
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => selected.join(", "),
                  }}
                  {...field}
                >
                  {audienceInterests.map((interest => (
                    <MenuItem key={interest} value={interest}>
                      {interest}
                    </MenuItem>
                  )))}
                </TextField>
              )}
            />
          </Grid>
          <Grid xs={4}>
            <Controller
              name='influencer.audience_location'
              control={control}
              defaultValue={watch('influencer.audience_location')}
              render={({ field }) => (
                <TextField
                  fullWidth
                  required
                  size="small"
                  margin="dense"
                  label="أماكن المتابعين"
                  {...register("influencer.audience_location", {
                    required: "هذا الحقل مطلوب",
                  })}
                  error={errors?.influencer?.audience_location != undefined}
                  helperText={errors?.influencer?.audience_location?.message}
                  select
                  multiple
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => selected.join(", "),
                  }}
                  {...field}
                >   
                  {audienceLocations.map((location) => (
                    <MenuItem key={location.value} value={location.value}>
                      {location.label}
                    </MenuItem>
                  ))}
                </TextField>

              )}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              margin="dense"
              fullWidth
              label="متوسط عدداللايكات"
              type="number"
              {...register('influencer.avg_likes')}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              margin="dense"
              fullWidth
              label="متوسط عدد التعليقات"
              type="number"
              {...register('influencer.avg_comments')}
            />
          </Grid>
          <Grid xs={6}>
            <FormControl id="age" fullWidth margin="dense" >
              {/* <InputLabel HTMLFor="age" >Audience age range</InputLabel> */}
              <FormLabel>فئة عمر الجمهور</FormLabel>

              <Slider
                // labelId='age-label'
                id="age"
                value={age}
                onChange={(e, newAge) => setAge(newAge)}
                min={3}
                step={1}
                max={80}
                marks={age.map(age => ({ value: age, label: age }))}
              />
            </FormControl>
          </Grid>
          <Grid xs={6}>
            <FormControl id="genderPrecent" fullWidth margin="dense">
              {/* <InputLabel HTMLFor="age" >Audience age range</InputLabel> */}
              <FormLabel>نسبة الرجال الى النساء</FormLabel>

              <Slider
                // labelId='age-label'
                id="genderPrecent"
                aria-label="Custom marks"
                value={genderPercent}
                onChange={(e, newValue) => setGenderPercent(newValue)}
                min={0}
                step={1}
                max={100}
                marks={[{ value: genderPercent, label: `${genderPercent}% رجال` }]}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <Divider sx={{ my: 1, fontSize: '.75em' }}>
              شروط خاصة
            </Divider>
          </Grid>
          <Grid xs={12}>

            {specialRequriements.map((req, index) => (
              <PlatformInput
                defaultValue={watch('influencer.special_requriements')}
                dir='rtl'
                key={req.id} // important to include key with platform's id
                {...register(`influencer.special_requriements.${index}`, {
                  required: 'يجب ملئ هذا الحقل او حذفه',
                })}
                error={errors?.influencer?.special_requriements && Boolean(errors?.influencer?.special_requriements)}
                helperText={errors?.influencer?.special_requriements && errors?.influencer?.special_requriements[index]?.message}
                margin="dense"
                size='small'
                label='شرط'
                required
                fullWidth
                handleDelete={() => removeSpecialRequriements(index)}
                removable={true}
              />
            ))}
            <IconButton onClick={() => appendSpecialRequriements(' ')} color="primary" aria-label="add field">
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>


        <Button
          size="small"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          {waiting ? <CircularProgress color="inherit" size={23} /> : "تحديث المعلومات"}
        </Button>
        <Button
          href='/'
          size="small"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ my: 1 }}
        >الصفحة الرئيسية
        </Button>
        {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
        {successAlert && <Alert severity="success">{successAlert}</Alert>}
      </Box>
    </Box>
  )
}

export default MyAccountInfluencer