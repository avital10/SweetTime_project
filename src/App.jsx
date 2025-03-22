import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SweetList from "./pages/SweetList";
import Display from "./Display";
import AddSweetForm from "./AddSweetForm ";
import Login from "./pages/Login";
import Register from "./pages/register";
import Cart from "./pages/Cart";
import Navbar from "./pages/navbar";
import { userIn } from "./features/userSlice";
import { addToCart } from "./features/cartSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Order from "./pages/order";
import Card from "./pages/Card";



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      dispatch(userIn(savedUser));
    }

    // const savedCart = JSON.parse(localStorage.getItem("cart"));
    // if (savedCart) {
    //   dispatch(setCart(savedCart)); //setCart-אם מחליטים שיש צורך יש לבנות
    // }
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-pink-100">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="/" element={<SweetList />}>
            <Route path="details/:id" element={<Display />} />
          </Route>
          <Route path="/Order" element={<Order/>} />

          <Route path="/Card" element={<Card />}/>
          <Route path="AddSweetForm" element={<ProtectedRoute><AddSweetForm /></ProtectedRoute>} />
        </Routes>
      </div>
      <Navbar />
    </>
  );
}
export default App;