import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ייבוא של useNavigate
import { Box, TextField, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function Order() {
  

  const arrCart = useSelector((st) => st.cart.arr);
  const currentUser = useSelector(state => state.user.currentUser);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const totalAmount = arrCart.reduce((total, item) => total + item.price * item.qty, 0);

  const handleProceedToCard = () => {
    navigate("/Card"); // מעבר לעמוד כרטיס אשראי
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>פרטי משלוח</Typography>

      <TextField
        label="שם מלא"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="כתובת"
        variant="outlined"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="עיר"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Typography variant="h6" sx={{ mb: 2 }}>סה"כ לתשלום: {totalAmount} ₪</Typography>
 <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleProceedToCard}
      >
        המשך לתשלום
      </Button> 
    </Box>
  );
}
