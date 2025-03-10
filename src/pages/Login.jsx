import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginServer } from "../api/userService";
import { userIn } from "../features/userSlice";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let res = await loginServer(data);
      dispatch(userIn(res.data)); // שמירת המשתמש ברידקס
      localStorage.setItem("currentUser", JSON.stringify(res.data)); // שמירת המשתמש בלוקאל סטורג'
      alert("התחברת בהצלחה!");
      navigate("/cart");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="w-96 p-6 shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">התחברות</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("userName")} placeholder="userName" className="border p-2 w-full mb-2" />
        <input {...register("password")} type="password" placeholder="סיסמה" className="border p-2 w-full mb-2" />
        <button type="submit" className="bg-pink-500 text-white p-2 w-full">התחבר</button>
      </form>
    </div>
  );
}
