import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Display = () => {
    const sweet = useSelector(state => state.sweet.selectedSweet);
    let navigate = useNavigate();

    if (!sweet) return null;

    return (
        <div style={styles.overlay} onClick={() => navigate(-1)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button style={styles.closeButton} onClick={() => navigate(-1)}>✖</button>
                <h1>{sweet.name}</h1>
                <p>{sweet.description}</p>
                <p>מחיר: {sweet.price} ש"ח</p>
                <p>קטגוריה: {sweet.category}</p>
                <p>מרכיבים: {sweet.ingredient.join(", ")}</p>
                {sweet.picture && <img src={sweet.picture} alt={sweet.name} style={styles.image} />}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        paddingTop: "50px", // להוסיף מקום עבור ה-navbar
    },
    modal: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        position: "relative",
        maxWidth: "500px", // רוחב מקסימלי
        width: "90%", // רוחב משתנה בהתאם לגודל המסך
        height: "600px", // גובה מוגדל כך שהתצוגה תהיה יותר גדולה
        overflowY: "auto", // אם התוכן גדול מדי, יופיע סרגל גלילה רק אם התוכן גדול מדי
    },
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "15px",
        background: "none",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
    },
    image: {
        width: "100%", // התמונה תתפוס את כל הרוחב
        height: "auto", // גובה התמונה יתאים בהתאם לרוחב
        objectFit: "contain", // התמונה תתאים לפרופורציות בתוך המיכל
        maxHeight: "250px", // הגבלת גובה התמונה
        borderRadius: "10px",
        marginTop: "10px",
    }
};

export default Display;