import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { registerServer } from "../api/userService";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let res = await registerServer(data);
      dispatch(userIn(res.data));
      alert("נרשמת בהצלחה!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "שגיאה בהרשמה");
    }
  };

  return (
    <Container maxWidth="sm" className="register-container">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          שמחים שבאת! רק כמה פרטים שנכיר אותך
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="שם משתמש"
            dir="rtl"
            {...register("userName", {
              required: "שם משתמש הוא שדה חובה",
              minLength: { value: 3, message: "שם המשתמש חייב להכיל לפחות 3 תווים" },
            })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
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
            type="password"
            dir="rtl"
            {...register("password", {
              required: "סיסמה היא שדה חובה",
              minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            הרשמה
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
