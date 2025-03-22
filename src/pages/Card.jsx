import { useState } from "react";
import "./cardStyle.css";
import Confetti from "react-confetti"; // Assuming you have this installed
import { Button, Typography } from "@mui/material"; // Assuming you're using Material UI

const getCardType = (number) => {
  const cleaned = number.replace(/\D/g, "");
  if (/^4/.test(cleaned)) return { name: "Visa", bg: "visa", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" };
  if (/^5[1-5]/.test(cleaned)) return { name: "MasterCard", bg: "mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" };
  return { name: "", bg: "default", logo: "" };
};

export default function CreditCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [cvc, setCvc] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false); // Added state for order completion
  const [isCardValid, setIsCardValid] = useState(true); // Added state for card validation

  const cardType = getCardType(cardNumber);

  const handleOrderComplete = () => {
    // Your logic to handle order completion
    setIsOrderComplete(true);
  };

  const handleGoBackToShop = () => {
    // Logic to go back to the shop
    setIsOrderComplete(false);
  };

  return (
    <div className="credit-card-container">
      {/* כרטיס אשראי */}
      <div className={`credit-card ${isFlipped ? "flipped" : ""}`}>
        {/* צד קדמי */}
        <div className="front">
          {cardType.logo && <img src={cardType.logo} alt={cardType.name} className="logo" />}
          <div className="number">{cardNumber || "**** **** **** ****"}</div>
          <div className="name">{cardholder || "Card Holder"}</div>
          <div className="expiry">{expiry || "MM/YY"}</div>
        </div>

        {/* צד אחורי */}
        <div className="back">
          <div className="black-bar"></div>
          <div className="cvc">{cvc || "CVC"}</div>
        </div>
      </div>

      {/* אינפוטים להזנת הנתונים */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Card Number"
          maxLength="19"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Card Holder Name"
          value={cardholder}
          onChange={(e) => setCardholder(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          maxLength="5"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVC"
          maxLength="3"
          value={cvc}
          onFocus={() => setIsFlipped(true)}
          onBlur={() => setIsFlipped(false)}
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>

      {/* Button to complete the order */}
      <button
        onClick={handleOrderComplete}
        style={{
          marginTop: "20px",
          fontSize: "1.5rem",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        סיים הזמנה
      </button>

      {/* Show order completion if order is done */}
      {isOrderComplete && (
        <div className="order-complete">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            ההזמנה הושלמה בהצלחה!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            תודה על רכישתך! ההזמנה שלך נקלטה בהצלחה.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoBackToShop} // ניווט חזרה לחנות
            sx={{ padding: "10px 20px", fontSize: "16px" }}
          >
            חזור לחנות
          </Button>
          {isCardValid && (
            <Typography variant="h6" sx={{ color: "green", fontWeight: "bold", marginTop: 2 }}>
              <span role="img" aria-label="checkmark">✔</span> כרטיס אושר
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
