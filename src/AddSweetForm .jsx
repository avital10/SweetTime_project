import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addSweet, editsweet } from './api/SweetService';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddSweetForm = () => {
    const location = useLocation();
    const navigate = useNavigate();  // הוספת useNavigate
    const sweet = location.state?.sweet || null; 
    const isEditing = !!sweet;
    
    let { register, handleSubmit, reset } = useForm();
    let disp = useDispatch();
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
                await editsweet(sweet._id, newSweet);
                setMessage("✅ הממתק נערך בהצלחה!");
            } else {
                let response = await addSweet(newSweet);
                if (response.status === 201 || response.status === 200) {
                    setMessage("✅ הממתק נוסף בהצלחה!");
                    reset();
                } else {
                    setMessage("❌ אירעה שגיאה בהוספת הממתק.");
                }
            }
              
            navigate('/');
        } catch (error) {
            console.error(error);
            setMessage("❌ שגיאה! לא ניתן היה להוסיף את הממתק.");
        }
    };

    return (
        <form onSubmit={handleSubmit(save)}>
            <input type="text" {...register("productName")} placeholder="שם הממתק" required />
            <input type="text" {...register("description")} placeholder="תיאור" required />
            <input type="number" {...register("price")} placeholder="מחיר" required />
            <input type="text" {...register("category")} placeholder="קטגוריה" required />
            <input type="text" {...register("picture")} placeholder="כתובת תמונה" />
            <input type="text" {...register("ingredient")} placeholder="רשימת מרכיבים (מופרדים בפסיק)" required />
            <button type="submit">{isEditing ? "ערוך ממתק" : "הוסף ממתק"}</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default AddSweetForm;