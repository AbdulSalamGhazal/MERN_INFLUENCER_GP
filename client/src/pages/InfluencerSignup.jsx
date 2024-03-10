import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import PasswordInput from "../components/signup/PasswordInput";
import PlatformInput from "../components/signup/PlatformInput";
import patterns from "../utils/patterns";


const InfluencerSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm({
    // defaultValues: {
    //   platforms: ['']
    // }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'platforms', // unique name for your Field Array
    rules: { minLength: 1 }
  });

  useEffect(() => {
    append('')
  }, [])

  const [errorAlert, setErrorAlert] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const { login } = useAuth();
  let navigate = useNavigate();
  console.log(errors)

  const onSubmit = async () => {
    setWaiting(true)
    const influencer = {
      name: watch('name'),
      email: watch('email'),
      password: watch('password'),
      platforms: watch('platforms')
    };
    try {
      const { data } = await axios.post(
        "http://localhost:3001/influencers",
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
      navigate("/");
    } catch (error) {
      setWaiting(false)
      console.error("Error fetching data:", error);
      // setErrorAlert(error.message);
      setErrorAlert('حدث خطأ حاول مجددا')
      setTimeout(() => {
        setErrorAlert(null);
      }, 3000);
    }
  };

  return (
    <Box>
      {/* TODO: the title needs some styles */}
      {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
      {/* {<Alert severity="error" sx={{ visibility: errorAlert == null ? 'hidden' : 'vislible' }}>{errorAlert}</Alert>} */}
      {/* <Typography component="h1" variant="h3" align="center">
        انضمام مشهور
      </Typography> */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1, maxWidth: '500px', mx: 'auto' }}
      >

        <TextField
          size="small"
          margin="dense"
          required
          fullWidth
          label="الاسم الكامل"
          autoComplete="name"
          autoFocus
          {...register('name', {
            required: 'هذا الحقل مطلوب',
          })}
          error={errors.name != undefined}
          helperText={errors.name?.message}
        />

        <TextField
          dir="ltr"
          size="small"
          margin="dense"
          required
          fullWidth
          label="البريد الالكتروني"
          autoComplete="email"
          {...register('email', {
            required: 'هذا الحقل مطلوب',
            pattern: {
              value: patterns.emailPattern,
              message: "غير صالح"
            }
          })}
          error={errors.email != undefined}
          helperText={errors.email?.message}
        />

        <PasswordInput
          margin="dense"
          size="small"
          fullWidth
          required
          label="كلمة المرور"
          autoComplete="new-password"
          {...register("password", {
            required: "هذا الحقل مطلوب",
            minLength: {
              value: patterns.passwordMinLength,
              message: "كلمة المرور يجب الا تقل عن 8 احرف",
            },
            maxLength: {
              value: patterns.passwordMaxLength,
              message: "كلمة المرور يجب الا تتجاوز 20 حرفا",
            },
            pattern: {
              value: patterns.passwordPattern,
              message:
                "كلمة المرور يجب ان تحتوي على الاقل على: حرف صغير وحرف كبير ورقم ورمز",
            },
          })}
          filled={Boolean(watch('password'))}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          />

        <PasswordInput
          {...register("confirmPassword", {
            required: "هذا الحقل مطلوب",
            validate: {
              samePassword: (e) =>
              e === watch('password') || "كلمة المرور المدخلة مختلفة",
            },
          })}
          filled={Boolean(watch('confirmPassword'))}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          margin="dense"
          fullWidth
          size='small'
          required
          label="تأكيد كلمة المرور"
          autoComplete="new-password"
        />
        <Divider sx={{my: 1, fontSize:'.75em'}}>
          اضف روابط حسابات التواصل الاجنماعي خاصتك 
        </Divider> 
        {fields.map((field, index) => (
          <PlatformInput
            dir='ltr'
            key={field.id} // important to include key with field's id
            {...register(`platforms.${index}`, {
              required: fields.length === 1 ? 'يجب ان تضيف حسابا واحدا على الاقل' : 'يجب ملئ هذا الحقل او حذفه',
              pattern: {
                value: patterns.platformsPattern,
                message: 'غير صالح'
              }
            })}
            error={errors.platforms && Boolean(errors.platforms)}
            helperText={errors.platforms && errors.platforms[index]?.message}
            margin="dense"
            size='small'
            label='حسابك في احد منصات التواصل الاجتماعي'
            required
            fullWidth
            handleDelete={() => remove(index)}
            removable={fields.length > 1}
            link={watch(`platforms.${index}`) || ''}
          />
        ))}
        <IconButton onClick={() => append(' ')} color="primary" aria-label="add field">
          <AddCircleOutlineIcon />
        </IconButton>

        <Button
          size="small"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {waiting ? <CircularProgress color="inherit" size={23} /> : 'انضم'}
        </Button>


      </Box>
    </Box>
  )
}

export default InfluencerSignup;