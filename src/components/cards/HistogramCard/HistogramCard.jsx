// components/cards/HistogramCard/HistogramCard.jsx
import React from "react";
import "./index.css";

const HistogramCard = ({ card }) => {
    const cardDate = new Date(card.date);
    const day = String(cardDate.getDate()).padStart(2, '0');
    const month = String(cardDate.getMonth() + 1).padStart(2, '0');
    const year = cardDate.getFullYear();
    const dateString = `${day}.${month}.${year}`;

    return (
        <div className="histogramCard" style={{
            borderLeft: "2px solid #e0e0e0",
            display: "flex",
        }}>
            <div>
                {dateString}
            </div>
            <div>
                {card.totalDocs}
            </div>
            <div>
                {card.riskFactors}
            </div>
        </div>
    );
};

export default HistogramCard;
