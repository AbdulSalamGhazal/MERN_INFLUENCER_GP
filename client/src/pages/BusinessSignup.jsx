import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import PasswordInput from "../components/signup/PasswordInput";
import patterns from "../utils/patterns";

const BusinessSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [errorAlert, setErrorAlert] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const { login } = useAuth();
  let navigate = useNavigate();

  const onSubmit = async () => {
    setWaiting(true);
    const business = {
      name: watch("name"),
      email: watch("email"),
      password: watch("password"),
    };
    try {
      const { data } = await axios.post(
        "http://localhost:3001/business",
        business,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // setBusiness(inintialBusiness);
      login(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.error("Error fetching data:", error);
      // setErrorAlert(error.message);
      setErrorAlert('حدث خطأ حاول مجددا');
      setWaiting(false);
      setTimeout(() => {
        setErrorAlert(null);
      }, 3000);
    }
  };

  return (
    <Box>
      {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
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
        sx={{ mt: 1, maxWidth: "500px", mx: "auto" }}
      >
        <TextField
          size="small"
          margin="dense"
          required
          fullWidth
          label="الاسم"
          autoComplete="name"
          autoFocus
          {...register("name", {
            required: "هذا الحقل مطلوب",
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
          {...register("email", {
            required: "هذا الحقل مطلوب",
            pattern: {
              value: patterns.emailPattern,
              message: "غير صالح",
            },
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
                e === watch("password") || "كلمة المرور المدخلة مختلفة",
            },
          })}
          filled={Boolean(watch('confirmPassword'))}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          margin="dense"
          fullWidth
          size="small"
          required
          label="تأكيد كلمة المرور"
          autoComplete="new-password"
        />

        <Button
          size="small"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {waiting ? <CircularProgress color="inherit" size={23} /> : "انضم"}
        </Button>
      </Box>
    </Box>
  );
};

export default BusinessSignup;
