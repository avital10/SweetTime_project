import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSweets, deleteSweet, getTotalSweets, editsweet } from "../api/SweetService";
import { selectSweet } from "../features/sweet/SweetSlice";
import { addToCart, reduce, remove } from "../features/cartSlice";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, Avatar, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; // ייבוא אייקון פח
import { logoutAndClearCart } from "../features/userSlice"; // הפונקציה החדשה שלך להתנתקות עם ניקוי הסל
import Sweet from "../components/Sweet";
import MinCart from "../components/MinCart";

const SweetList = () => {
  const [status, setStatus] = useState("init");
  const [arr, setArr] = useState([]);
  const [totalA, setTotalA] = useState(3);
  const [isSmallCartOpen, setIsSmallCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // חיפוש לפי שם

  const arrCart = useSelector((state) => state.cart.arr);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // מיקום המשתמש בדף הנוכחי

  useEffect(() => {
    setStatus("pending");
    getAllSweets(1)
      .then(res => {
        setArr(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("שגיאה בקבלת ממתקים");
      })
      .finally(() => {
        setStatus("finish");
      });
  }, []);

  useEffect(() => {
    getTotalSweets()
      .then(res => {
        setTotalA(res.data.ingredient);
      })
      .catch(err => {
        console.log(err);
        alert("שגיאה בקבלת נתונים");
      });
  }, []);

  useEffect(() => {
    if (arrCart.length > 0) {
      setIsSmallCartOpen(true);
    }
  }, [arrCart]);

  // הוספת סגירה אוטומטית של הסל אחרי 2 שניות
  useEffect(() => {
    if (isSmallCartOpen) {
      const timer = setTimeout(() => {
        setIsSmallCartOpen(false);
      }, 2000);
      return () => clearTimeout(timer); // מסלק את הטיימר אם רכיב יוסר
    }
  }, [isSmallCartOpen]);

  const deleteItem = async (id) => {
    try {
      let res = await deleteSweet(id);
      let copy = arr.filter(item => item._id !== id);
      setArr(copy);
    } catch (err) {
      console.log(err);
    }
  };


  // const EditItem = async (id) => {
  //   try {
  //     let res = await editsweet(id)
  //     let copy = arr.filter(item => item._id !== id)
  //     setArr(copy)
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // };

  // const totalAmount = arrCart.reduce((total, item) => total + item.price * item.qty, 0);
  // const totalItems = arrCart.reduce((total, item) => total + item.qty, 0);

  // הגבלה: אל תפתח את הסל אם המשתמש בעמוד סל הקניות
  const isCartPage = location.pathname === '/cart'; // בודק אם אנחנו בעמוד סל הקניות

  // פונקציה לסינון הממתקים לפי שם
  const filteredSweets = arr.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ direction: "rtl", width: "100%" }}>
      <h1>הממתקים</h1>

      {/* שדה חיפוש */}
      <TextField
        label="חפש ממתק"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* סל קניות קטן, לא יפתח בעמוד סל הקניות */}
      {!isCartPage && isSmallCartOpen && (<MinCart/>
      )}

      {status === "pending" ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="flex-start" style={{ width: '100%' }}>
          {filteredSweets.map(item => (
            <Sweet  key={item._id} item={item} deleteItem={deleteItem}/>    
          ))}
        </Grid>
      )}
      <Outlet />
    </div>
  );
};

export default SweetList;
