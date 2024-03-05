import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
      navigate("/home");
    } catch (error) {
      setWaiting(false)
      console.error("Error fetching data:", error);
      setErrorAlert(error.message);
      setTimeout(() => {
        setErrorAlert(null);
      }, 3000);
    }
  };

  return (
    <Box>
      {/* TODO: the title needs some styles */}
      {<Alert severity="error" sx={{ visibility: errorAlert == null ? 'hidden' : 'vislible' }}>{errorAlert}</Alert>}
      <Typography component="h1" variant="h4" align="center">
        Influecer Sign Up
      </Typography>
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
          label="Full Name"
          autoComplete="name"
          autoFocus
          {...register('name', {
            required: 'this field is required',
          })}
          error={errors.name != undefined}
          helperText={errors.name?.message}
        />

        <TextField
          size="small"
          margin="dense"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email', {
            required: 'this field is required',
            pattern: {
              value: patterns.emailPattern,
              message: "Please enter a valid email address."
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
          label="Password"
          autoComplete="new-password"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: patterns.passwordMinLength,
              message: "Password must be at least 8 characters long.",
            },
            maxLength: {
              value: patterns.passwordMaxLength,
              message: "Password must be at most 20 characters long.",
            },
            pattern: {
              value: patterns.passwordPattern,
              message:
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />

        <PasswordInput
          {...register("confirmPassword", {
            required: "this field is required",
            validate: {
              samePassword: (e) =>
                e === watch('password') || "the password is different",
            },
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          margin="dense"
          fullWidth
          size='small'
          required
          label="Confirm password"
          autoComplete="new-password"
        />
        <Divider sx={{my: 1, fontSize:'.75em'}}>
           add your social media accounts 
        </Divider> 
        {fields.map((field, index) => (
          <PlatformInput
            key={field.id} // important to include key with field's id
            {...register(`platforms.${index}`, {
              required: fields.length === 1 ? 'you have to provdie at least one social media link' : 'fill it or remove it',
              pattern: {
                value: patterns.platformsPattern,
                message: 'invalid social media account'
              }
            })}
            error={errors.platforms && Boolean(errors.platforms)}
            helperText={errors.platforms && errors.platforms[index]?.message}
            margin="dense"
            size='small'
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
          {waiting ? <CircularProgress color="inherit" size={23} /> : 'Sign In'}
        </Button>


      </Box>
    </Box>
  )
}

export default InfluencerSignup;