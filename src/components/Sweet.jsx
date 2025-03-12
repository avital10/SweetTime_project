import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice"
import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectSweet } from "../features/sweet/SweetSlice";

const Sweet = ({ item }) => {
    let dispatch = useDispatch();
    let navigate=useNavigate()

  const currentUser = useSelector(state => state.user.currentUser);


    return (<>
      <Grid item xs={12} sm={6} md={4} style={{ width: '100%' }}>
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
    </>)
}
export default Sweet;