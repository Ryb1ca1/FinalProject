// components/TarifSection/TariffSection.jsx
import { prices } from "../../mockData/prices.jsx";
import TarifCard from "../cards/TariffCard/TariffCard.jsx";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import './index.css';

const TariffSection = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div
            className='tarifdiv'
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                width: '90%',
                margin: '0 0 118px 0',
                justifyContent: 'space-between',
                boxSizing: 'border-box'
            }}
        >
            <div
                className="ourPrices"
                style={{
                    fontWeight: '900',
                    fontSize: '45px',
                    marginBottom: '70px',
                    justifyItems: 'flex-start'
                }}
            >
                Наши тарифы
            </div>

            <div
                className="tariffs"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '37px',
                    padding: 0,
                    margin: 0,
                    minWidth: '335px'
                }}
            >
                {prices.map((price, index) => (
                    <React.Fragment key={index}>
                        <TarifCard isActive={!isAuthenticated ? false : index === 0} tarif={price} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default TariffSection;
