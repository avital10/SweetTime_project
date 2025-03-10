import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSweets, deleteSweet, getTotalSweets,editsweet } from "../api/SweetService";
import { selectSweet } from "../features/sweet/SweetSlice";
import { addToCart, reduce, remove } from "../features/cartSlice";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, Avatar } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; // ייבוא אייקון פח
import { logoutAndClearCart } from "../features/userSlice"; // הפונקציה החדשה שלך להתנתקות עם ניקוי הסל
import Sweet from "../components/Sweet";


const SweetList = () => {
  const [status, setStatus] = useState("init");
  const [arr, setArr] = useState([]);
  const [totalA, setTotalA] = useState(3);
  const [isSmallCartOpen, setIsSmallCartOpen] = useState(false);

  const currentUser = useSelector(state => state.user.currentUser);
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

  const handleLogout = () => {
    dispatch(logoutAndClearCart()); // ניקוי הסל יחד עם התנתקות
  };

  const deleteItem = async (id) => {
    try {
      let res = await deleteSweet(id);
      let copy = arr.filter(item => item._id !== id);
      setArr(copy);
    } catch (err) {
      console.log(err);
    }
  };
  const EditItem = async (id) => {
    try {
        let res = await editsweet(id)
        let copy = arr.filter(item => item._id !== id)
        setArr(copy)
    }
    catch (err) {
        console.log(err);

    }
}

  const totalAmount = arrCart.reduce((total, item) => total + item.price * item.qty, 0);
  const totalItems = arrCart.reduce((total, item) => total + item.qty, 0);

  // הגבלה: אל תפתח את הסל אם המשתמש בעמוד סל הקניות
  const isCartPage = location.pathname === '/cart'; // בודק אם אנחנו בעמוד סל הקניות

  return (
    <div style={{ direction: "rtl", width: "100%" }}>
      {/* Avatar עם אות ראשונה של שם המשתמש */}
      {currentUser && (
        <div style={{ position: "fixed", top: 20, right: 20 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {currentUser?.name ? currentUser.name.charAt(0) : "U"}
          </Avatar>
          <Button onClick={handleLogout} variant="outlined" sx={{ marginTop: 1 }}>
            התנתק
          </Button>
        </div>
      )}

      <h1>הממתקים</h1>

      {/* סל קניות קטן, לא יפתח בעמוד סל הקניות */}
      {!isCartPage && isSmallCartOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: '60px',
            left: 0,
            width: '350px',
            height: 'calc(100% - 20px)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: 2,
            boxShadow: 2,
            zIndex: 1000,
            overflowY: 'auto',
            borderRadius: 2,
          }}
        >
          {/* כפתור סגירה */}
          <Button
            sx={{
              position: 'absolute',
              top: 10,
              left: -10,
              color: '#fff',
              backgroundColor: 'transparent',
              fontSize: '20px',
              '&:hover': { backgroundColor: 'transparent' }
            }}
            onClick={() => setIsSmallCartOpen(false)}
          >
            ❌
          </Button>

          <Typography variant="h6" align="center" gutterBottom>
            סל קניות
          </Typography>
          <Box>
            {arrCart.map((item) => (
              <Box key={item._id} sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                    marginRight: 2
                  }}
                  image={item.picture || "placeholder.jpg"}
                  alt={item.productName}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{item.productName}</Typography>
                  <Typography variant="body2" color="text.secondary">₪{item.price}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    sx={{ marginRight: 1 }}
                    onClick={() => dispatch(reduce(item))}
                  >
                    -
                  </Button>
                  <Typography variant="body2">{item.qty}</Typography>
                  <Button
                    variant="outlined"
                    sx={{ marginLeft: 1 }}
                    onClick={() => dispatch(addToCart(item))}
                  >
                    +
                  </Button>
                </Box>

                <Button
                  variant="outlined"
                  sx={{
                    marginLeft: 1,
                    color: 'red',
                    borderColor: 'red',
                    '&:hover': { borderColor: 'red', backgroundColor: 'transparent' }
                  }}
                  onClick={() => dispatch(remove(item))}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            ))}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body1">סה"כ:</Typography>
              <Typography variant="body1" fontWeight="bold">{totalAmount} ₪</Typography>
            </Box>
          </Box>
        </Box>
      )}

      {status === "pending" ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="flex-start" style={{ width: '100%' }}>
          {arr.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item._id} style={{ width: '100%' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.picture || "placeholder.jpg"}
                  alt={item.productName}
                />
                <CardContent>
                  <Typography variant="h6">{item.productName}</Typography>
                  <Typography variant="body1">₪{item.price}</Typography>
                  {currentUser?.role === "admin" && (
                    <Button
                      variant="outlined"
                      sx={{ borderColor: 'black', color: 'black', '&:hover': { borderColor: 'white', backgroundColor: 'red' }, marginBottom: '10px' }}
                      onClick={() => deleteItem(item._id)}
                    >
                      מחק
                    </Button>
                  )}
                  {currentUser?.role === "admin" && (
                    <Button
                      variant="outlined"
                      sx={{ borderColor: 'black', color: 'black', '&:hover': { borderColor: 'white', backgroundColor: 'red' }, marginBottom: '10px' }}
                      onClick={() => navigate("/AddSweetForm", { state: { sweet: item } })}

                    >
                      ✏️ ערוך
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    sx={{ borderColor: 'black', color: 'black', '&:hover': { borderColor: 'white', backgroundColor: 'red' }, marginBottom: '10px' }}
                    onClick={() => {
                      dispatch(selectSweet(item));
                      navigate("details/" + item._id);
                    }}
                  >
                    הצג
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: 'black', color: 'black', '&:hover': { borderColor: 'white', backgroundColor: 'red' }, marginBottom: '10px' }}
                    onClick={() => dispatch(addToCart(item))}
                  >
                    🛒 הוסף לסל
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Outlet />
    </div>
  );
};

export default SweetList;
