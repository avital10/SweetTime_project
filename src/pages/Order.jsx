import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ייבוא של useNavigate
import { Box, TextField, Typography, Button } from "@mui/material";

export default function Order() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const totalAmount = 150; // סכום לדוגמה, אפשר להחליף בערך מהעגלה

  const handleProceedToCard = () => {
    navigate("/credit-card"); // מעבר לעמוד כרטיס אשראי
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
