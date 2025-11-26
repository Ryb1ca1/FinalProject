// components/Footer/Footer.jsx
import "./index.css";

const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: '#029491',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
                borderTop: '1px solid #e0e0e0',
                width: "100%",
                height: '137px',
                boxSizing: "border-box",
                display: 'flex',
                position: 'relative',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ width: '100px', height: 'auto' }}>
                <img className="logo" src='/icons/FooterLogo.svg' alt="CKAH Logo" style={{ width: '100px', height: 'auto' }} />
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    color: 'white'
                }}>
                    <div style={{ fontSize: '16px' }}>
                        г. Москва, Цветной б-р, 40
                    </div>
                    <div style={{ fontSize: '16px' }}>
                        +7 485 771 21 11
                    </div>
                    <div style={{ fontSize: '16px' }}>
                        <a href="mailto:info@skan.ru" style={{ color: 'white', textDecoration: 'none' }}>
                            info@skan.ru
                        </a>
                    </div>
                    <div style={{
                        fontSize: '14px',
                        color: 'white'
                    }}>
                        Copyright © 2022
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
