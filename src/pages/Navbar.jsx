import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAndClearCart } from "../features/userSlice";
import { clearCart } from "../features/cartSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser); // בדיקה אם יש משתמש מחובר

  const handleLogout = () => {
    dispatch(logoutAndClearCart());
    dispatch(clearCart());
    navigate("/");
  };
  const handleAddSweetClick = () => {
    navigate("/AddSweetForm", { state: { sweet: null } }); // שולח מידע ריק כדי לאתחל טופס
  };
  return (
    <AppBar position="fixed" color="error" sx={{ borderBottom: 2, borderColor: "white" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Box
          sx={{
            position: "absolute",
            top: -5,
            left: 10,
            padding: 1,
            color: "black",
            fontWeight: "bold",
            fontSize: "35px",
            display: "inline-block",
            letterSpacing: 1,
            textShadow: `
              -1px -1px 0 white,  
              1px -1px 0 white,
              -1px 1px 0 white,
              1px 1px 0 white
            `,
          }}
        >
          SweetTime
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexGrow: 1 }}>
          <Button component={Link} to="/" variant="text" sx={{ color: "white", fontWeight: "bold", '&:hover': { color: 'black' } }}>
            חנות ממתקים
          </Button>
          <Button component={Link} to="/cart" variant="text" sx={{ color: "white", '&:hover': { color: 'black' } }}>
            סל קניות
          </Button>
          <Button 
    variant="text" 
    sx={{ color: "white", '&:hover': { color: 'black' } }}
    onClick={() => navigate("/AddSweetForm", { state: { resetForm: true } })} 
>
    הוספת מוצר
</Button>
        </Box>

        <Box sx={{ position: "absolute", top: 8, right: 16 }}>
          {currentUser ? (
            <Button onClick={handleLogout} variant="text" sx={{ color: "white", '&:hover': { color: 'black' } }}>
              התנתקות
            </Button>
          ) : (
            <>
              <Button component={Link} to="/register" variant="text" sx={{ color: "white", '&:hover': { color: 'black' } }}>
                הרשמה
              </Button>
              <Button component={Link} to="/login" variant="text" sx={{ color: "white", '&:hover': { color: 'black' } }}>
                התחברות
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
