import { useDispatch, useSelector } from "react-redux";
import { addToCart, reduce, remove } from "../features/cartSlice";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; // ייבוא אייקון פח


const MinCart = () => {
  const arrCart = useSelector((state) => state.cart.arr);

 const totalAmount = arrCart.reduce((total, item) => total + item.price * item.qty, 0);
  const totalItems = arrCart.reduce((total, item) => total + item.qty, 0);


    // const [isSmallCartOpen, setIsSmallCartOpen] = useState(false);
  

    // let dispatch=useDispatch()

    //   useEffect(() => {
    //     if (arrCart.length > 0) {
    //       setIsSmallCartOpen(true);
    //     }
    //   }, [arrCart]);
    
    //   // הוספת סגירה אוטומטית של הסל אחרי 2 שניות
    //   useEffect(() => {
    //     if (isSmallCartOpen) {
    //       const timer = setTimeout(() => {
    //         setIsSmallCartOpen(false);
    //       }, 2000);
    //       return () => clearTimeout(timer); // מסלק את הטיימר אם רכיב יוסר
    //     }
    //   }, [isSmallCartOpen]);


    return ( <>
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
    </> );
}

export default MinCart;