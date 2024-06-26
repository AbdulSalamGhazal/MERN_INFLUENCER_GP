import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import PasswordInput from "../components/signup/PasswordInput";
import patterns from "../utils/patterns";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return navigate("/");
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [errorAlert, setErrorAlert] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const [type, setType] = useState("Business");
  const { login } = useAuth();

  const onSubmit = async (inputs) => {
    setWaiting(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3001/login",
        { ...inputs, type },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      login(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setWaiting(false);
      console.error("Login error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // setErrorAlert(error.response.data.error);
        setErrorAlert("البريد لالكتروني او كلمة خاطئة");
      } else if (error.request) {
        // The request was made but no response was received
        // setErrorAlert("no reply, try later");
        setErrorAlert("حدث خطأ حاول مجددا");
      } else {
        // Something happened in setting up the request that triggered an Error
        // setErrorAlert("an error happend, try again");
        setErrorAlert("حدث خطأ حاول مجددا");
      }
      setTimeout(() => {
        setErrorAlert(null);
      }, 3000);
    }
  };

  return (
    <Box
      component="main"
      align="center"
      sx={{ maxWidth: "450px", margin: "auto" }}
    >
      {
        <Alert
          severity="error"
          sx={{ visibility: errorAlert == null ? "hidden" : "vislible" }}
        >
          {errorAlert}
        </Alert>
      }
      <Typography component="h1" variant="h3" align="center">
        تسجيل الدخول
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={type}
          onChange={(e, newValue) => setType(newValue)}
          variant="fullWidth"
        >
          <Tab label="تاجر" value={"Business"} />
          <Tab label="مؤثر" value={"Influencer"} />
        </Tabs>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          dir="ltr"
          size="small"
          margin="dense"
          required
          fullWidth
          label="البريد الإلكتروني"
          autoComplete="email"
          autoFocus
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
          size="small"
          margin="dense"
          required
          fullWidth
          label="كلمة المرور"
          type="password"
          autoComplete="current-password"
          {...register("password", { required: "هذا الحقل مطلوب" })}
          filled={Boolean(watch("password"))}
          error={errors.password != undefined}
          helperText={errors.password?.message}
        />
        <Button
          size="small"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {waiting ? <CircularProgress color="inherit" size={23} /> : "سجل"}
        </Button>
        <Grid container justifyContent={"space-between"}>
          <Grid>
            <Link href={`/signup/${type.toLowerCase()}`} variant="body2">
              {"ليس لديك حساب؟ قم بالتسجيل"}
            </Link>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
};

export default Login;
