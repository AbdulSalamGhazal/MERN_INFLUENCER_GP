import { useState, forwardRef } from 'react'
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


const VisibilityToggler = ({ showPassword, setShowPassword }) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword((show) => !show)}
        onMouseDown={() => setShowPassword((show) => !show)}
        edge="end"
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};


const PasswordInput = forwardRef(({filled, ...probs}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      dir='ltr'
      ref={ref}
      {...probs}
      type={showPassword ? "text" : "password"}
      InputProps={filled?{
        endAdornment: (
          <VisibilityToggler
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ),
      }:null}
    />
  )
})

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;