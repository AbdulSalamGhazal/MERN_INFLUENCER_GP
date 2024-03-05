import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
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
import { useForm } from "react-hook-form"

import PasswordInput from "../components/signup/PasswordInput";
import patterns from "../utils/patterns";


const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [errorAlert, setErrorAlert] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const [type, setType] = useState("Business");
  const { login } = useAuth();
  let navigate = useNavigate();


  const onSubmit = async () => {
    setWaiting(true)
    try {
      const { data } = await axios.post(
        "http://localhost:3001/login",
        { ...watch(), type },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      login(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      setWaiting(false)
      console.error("Login error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        setErrorAlert(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorAlert('no reply, try later');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorAlert('an error happend, try again');
      }
      setTimeout(() => {
        setErrorAlert(null);
      }, 3000);
    }
  };

  return (
    <Box component="main" align='center' sx={{ maxWidth: '450px', margin: 'auto' }}>
      {/* {errorAlert && <Alert severity="error">{errorAlert}</Alert>} */}
      {<Alert severity="error" sx={{ visibility: errorAlert == null ? 'hidden' : 'vislible' }}>{errorAlert}</Alert>}
      <Typography component="h1" variant="h3" align="center">
        Sign in
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={type}
          onChange={(e, newValue) => setType(newValue)}
          variant="fullWidth"
        >
          <Tab label="Business" value={"Business"} />
          <Tab label="Influencer" value={"Influencer"} />
        </Tabs>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          size="small"
          margin="dense"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          // onChange={(e) => setEmail(e.target.value)}
          // value={getValues('email')}
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
          size="small"
          margin="dense"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          {...register('password', { required: 'this field is required' })}
          error={errors.password != undefined}
          helperText={errors.password?.message}
        />
        {/* should keep it? */}
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          size="small"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {waiting? <CircularProgress color="inherit" size={23}/> : 'Sign In'}
        </Button>
        {/* TODO: correct Link should be added in both links */}
        <Grid container justifyContent={'space-between'}>
          <Grid >
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid >
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* <TabPanel value="business"><LoginForm /></TabPanel>
      <TabPanel value="influencer"><LoginForm /></TabPanel> */}
    </Box>
  );
};

export default Login;
