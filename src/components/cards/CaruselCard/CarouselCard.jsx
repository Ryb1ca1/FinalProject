// components/cards/CarouselCard/CarouselCard.jsx
import React from 'react';
import './index.css';

const CarouselCard = ({ text, svg, screen }) => {
    const isMobile = screen === 'mobile';
    const width = isMobile ? 290 : 400;
    const height = isMobile ? 188 : 225;
    const padding = isMobile ? '12px' : '30px 24px';
    const imgWidth = isMobile ? 35 : 65;
    const imgHeight = isMobile ? 45 : 79;

    return (
        <div
            className='card'
            style={{
                backgroundColor: '#ffffff',
                color: '#333333',
                width: `${width}px`,
                minWidth: `${width}px`,
                height: `${height}px`,
                minHeight: `${height}px`,
                borderRadius: '12px',
                padding: padding,
                boxSizing: 'border-box',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                lineHeight: '1.5',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
            }}
        >
            <img
                src={svg}
                alt="card"
                style={{
                    width: `${imgWidth}px`,
                    height: `${imgHeight}px`
                }}
            />
            <p style={{ margin: 0, textAlign: 'left' }}>{text}</p>
        </div>
    );
};

export default CarouselCard;
