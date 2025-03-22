import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addSweet, editsweet } from "./api/SweetService";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography, Paper, Grid } from "@mui/material";

const AddSweetForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const sweet = location.state?.sweet || null;
    const isEditing = !!sweet;
    const user = useSelector((st) => st.user.currentUser);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isEditing) {
            reset({
                productName: sweet.productName,
                description: sweet.description,
                price: sweet.price,
                category: sweet.category,
                picture: sweet.picture,
                ingredient: sweet.ingredient.join(","),
            });
        } else {
            reset({
                productName: "",
                description: "",
                price: "",
                category: "",
                picture: "",
                ingredient: "",
            });
        }
    }, [reset, sweet, isEditing]);

    const save = async (data) => {
        try {
            const newSweet = {
                productName: data.productName,
                description: data.description,
                creationDate: new Date().toISOString(),
                picture: data.picture || "https://via.placeholder.com/150",
                price: parseFloat(data.price),
                category: data.category,
                ingredient: data.ingredient.split(","),
            };

            if (isEditing) {
                await editsweet(sweet._id, newSweet, user?.token);
                setMessage("✅ הממתק נערך בהצלחה!");
            } else {
                let response = await addSweet(newSweet, user?.token);
                if (response.status === 201 || response.status === 200) {
                    setMessage("✅ הממתק נוסף בהצלחה!");
                    reset();
                } else {
                    setMessage("❌ אירעה שגיאה בהוספת הממתק.");
                }
            }

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.error(error);
            setMessage("❌ שגיאה! לא ניתן היה להוסיף את הממתק.");
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ mt: 5, p: 4, borderRadius: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {isEditing ? "עריכת ממתק" : "הוספת ממתק"}
                </Typography>
                <form onSubmit={handleSubmit(save)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="שם הממתק" 
                                {...register("productName", { required: "שדה חובה" })} 
                                error={!!errors.productName} 
                                helperText={errors.productName?.message} 
                                margin="normal" 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="תיאור" 
                                {...register("description", { required: "שדה חובה" })} 
                                error={!!errors.description} 
                                helperText={errors.description?.message} 
                                margin="normal" 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="מחיר" 
                                type="number" 
                                {...register("price", { required: "שדה חובה" })} 
                                error={!!errors.price} 
                                helperText={errors.price?.message} 
                                margin="normal" 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="קטגוריה" 
                                {...register("category", { required: "שדה חובה" })} 
                                error={!!errors.category} 
                                helperText={errors.category?.message} 
                                margin="normal" 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="כתובת תמונה" 
                                {...register("picture")} 
                                margin="normal" 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="רשימת מרכיבים (מופרדים בפסיק)" 
                                {...register("ingredient", { required: "שדה חובה" })} 
                                error={!!errors.ingredient} 
                                helperText={errors.ingredient?.message} 
                                margin="normal" 
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Button type="submit" variant="contained" color="primary" sx={{ width: "48%", mx: 1 }}>
                            {isEditing ? "עדכן" : "הוסף"}
                        </Button>
                        {isEditing && (
                            <Button type="button" variant="outlined" color="secondary" onClick={handleCancel} sx={{ width: "48%", mx: 1 }}>
                                ביטול
                            </Button>
                        )}
                    </Box>
                    {message && <Typography color="success.main" sx={{ mt: 2, textAlign: "center" }}>{message}</Typography>}
                </form>
            </Paper>
        </Container>
    );
};

export default AddSweetForm;
