import { useDispatch, useSelector } from "react-redux";
import { addToCart, reduce, remove } from "../features/cartSlice";
import { Box, Card, CardContent, Typography, Button, Grid, Avatar } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // ייבוא אייקון עגלת קניות

export default function Cart() {
  let arrCart = useSelector((st) => st.cart.arr);
  let dispatch = useDispatch();

  const increaseQty = (item) => {
    dispatch(addToCart(item));
  };

  const decreaseQty = (item) => {
    dispatch(reduce(item));
  };

  const totalAmount = arrCart.reduce((total, item) => total + item.price * item.qty, 0);
  const totalItems = arrCart.reduce((total, item) => total + item.qty, 0);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
      {/* סיכום בצד שמאל */}
      {arrCart.length > 0 && (
        <Box sx={{ width: '21%', height:'300px', border: '1px solid #ddd', padding: 2, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            סיכום
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">כמות פריטים:</Typography>
            <Typography variant="body1">{totalItems}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body1">סה"כ:</Typography>
            <Typography variant="body1" fontWeight="bold">{totalAmount} ₪</Typography>
          </Box>
        </Box>
      )}

      {/* פריטי הסל */}
      <Box sx={{ width: '75%' }}>
        {arrCart.length === 0 ? (
          // הצגת עגלת קניות ריקה עם כיתוב באנגלית במרכז הדף
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100vh', // גובה הדף
              flexDirection: 'column',
              textAlign: 'center',
              backgroundColor: 'rgba(169, 169, 169, 0.5)', // אפור חצי שקוף
              boxShadow: 2,
            }}
          >
            <Avatar sx={{ bgcolor: 'gray', width: 100, height: 100, marginBottom: 2 }}>
              <ShoppingCartIcon sx={{ fontSize: 60, color: 'white' }} />
            </Avatar>
            <Typography variant="h4" color="textSecondary">
              Your cart is empty
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {arrCart.map((item) => (
              <Grid item xs={12} sm={6} md={12} key={item._id}>
                <Card sx={{ display: 'flex', flexDirection: 'row', boxShadow: 3, padding: 2, width: '100%' }}>
                  {/* תמונה */}
                  <img 
                    src={item.picture} 
                    alt={item.name} 
                    style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 4, marginRight: 16 }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h6">{item.name}</Typography>
                    {item.description && <Typography variant="body2" color="textSecondary">{item.description}</Typography>}
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      {/* כפתורים להוספה/הורדה */}
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={() => decreaseQty(item)} 
                        sx={{ marginRight: 2 }}
                      >
                        -
                      </Button>
                      <Typography sx={{ mx: 2 }}>{item.qty}</Typography>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={() => increaseQty(item)} 
                        sx={{ marginLeft: 2 }}
                      >
                        +
                      </Button>
                    </Box>
                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
                      {item.price} ₪ :מחיר
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1, textAlign: 'center' }}>
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={() => dispatch(remove(item))} 
                      sx={{ width: '100%' }}
                    >
                      🗑️ הסר
                    </Button>
                    
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
