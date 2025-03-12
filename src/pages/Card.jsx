import { useState } from "react";
import "./cardStyle.css";

export default function CreditCard() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isFlipped, setIsFlipped] = useState(false); // מציין אם הכרטיס הפוך

  const handleCvcFocus = () => {
    setIsFlipped(true); // הופך את הכרטיס אוטומטית כשיש פוקוס על ה-CVV
  };

  const handleCvcBlur = () => {
    setIsFlipped(false); // מחזיר את הכרטיס למצב הרגיל כשהם מסיימים להקליד את ה-CVV
  };

  return (
    <div className="credit-card-container">
      <div className={`credit-card ${isFlipped ? "flipped" : ""}`}>
        {/* צד קדמי של הכרטיס */}
        <div className="card-front">
          <div className="card-number">{number || "#### #### #### ####"}</div>
          <div className="card-name">{name || "CARDHOLDER NAME"}</div>
          <div className="card-bottom">
            <span>{expiry || "MM/YY"}</span>
          </div>
        </div>

        {/* צד אחורי של הכרטיס */}
        <div className="card-back">
          <div className="card-cvc">{cvc || "CVC"}</div>
        </div>
      </div>

      <div className="input-fields">
        <input
          type="text"
          placeholder="Card Number"
          maxLength="19"
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cardholder Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expiry (MM/YY)"
          maxLength="5"
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVC"
          maxLength="3"
          onFocus={handleCvcFocus} // כשיש לחיצה על שדה ה-CVV, הכרטיס יתפוך
          onBlur={handleCvcBlur} // כשיש יציאה משדה ה-CVV, הכרטיס יחזור למצב הרגיל
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>
    </div>
  );
}
