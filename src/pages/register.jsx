import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { registerServer } from "../api/userService";

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
      dispatch(userIn(res.data)); // שמירת המשתמש ברידקס
      alert("נרשמת בהצלחה!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-96 p-6 shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">הרשמה</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "אימייל הוא שדה חובה",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "כתובת אימייל לא תקינה",
            },
          })}
          placeholder="אימייל"
          className="border p-2 w-full mb-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          {...register("password", {
            required: "סיסמה היא שדה חובה",
            minLength: {
              value: 6,
              message: "הסיסמה חייבת להכיל לפחות 6 תווים",
            },
          })}
          type="password"
          placeholder="סיסמה"
          className="border p-2 w-full mb-2"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <input
          {...register("userName", {
            required: "שם משתמש הוא שדה חובה",
            minLength: {
              value: 3,
              message: "שם המשתמש חייב להכיל לפחות 3 תווים",
            },
          })}
          placeholder="שם משתמש"
          className="border p-2 w-full mb-2"
        />
        {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}

        <button type="submit" className="bg-pink-500 text-white p-2 w-full">
          הירשם
        </button>
      </form>
    </div>
  );
}
