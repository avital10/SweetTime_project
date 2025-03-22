import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginServer } from "../api/userService";
import { userIn } from "../features/userSlice";
import { useState } from "react";
import { TextField, Button, Container, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export default function Login() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = watch("password", "");

  const onSubmit = async (data) => {
    try {
      let res = await loginServer(data);
      dispatch(userIn(res.data));
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      alert("התחברת בהצלחה!");
      navigate("/cart");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          התחברות
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          שמחים שבאת!
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="אימייל"
            dir="rtl"
            {...register("email", {
              required: "אימייל הוא שדה חובה",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "כתובת אימייל לא תקינה",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="סיסמה"
            type={showPassword ? "text" : "password"}
            dir="rtl"
            {...register("password", {
              required: "סיסמה היא שדה חובה",
              minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: passwordValue && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            התחבר
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
