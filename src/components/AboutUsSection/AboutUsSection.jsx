// components/AboutUsSection/AboutUsSection.jsx
import React, { useEffect, useState } from "react";
import CarouselCard from "../cards/CaruselCard/CarouselCard.jsx";
import "./index.css";

const AboutUsSection = () => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setScreenWidth(newWidth);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const icons = [
        "/icons/clock.svg",
        "/icons/magnifier.svg",
        "/icons/keyHole.svg",
        "/icons/clock.svg",
        "/icons/magnifier.svg",
        "/icons/keyHole.svg",
    ];

    const text = [
        "Высокая и оперативная скорость обработки заявки",
        "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
        "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
        "Высокая и оперативная скорость обработки заявки",
        "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
        "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    ];

    const cardWidth = screenWidth >= 575 ? 430 : 300;
    const visibleCards = screenWidth >= 1375 ? 3 : screenWidth >= 924 ? 2 : 1;
    const maxScroll = -((cardWidth) * (text.length - visibleCards));

    const nextSlide = () => {
        setCurrentPosition((prev) =>
            prev === maxScroll ? 0 : prev - cardWidth
        );
    };

    const prevSlide = () => {
        setCurrentPosition((prev) =>
            prev === 0 ? 0 : prev + cardWidth
        );
    };

    return (
        <div
            className="AboutUsSection"
            style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                alignItems: "flex-start",
            }}
        >
            <h1
                className="AboutUsSectionH1"
                style={{
                    fontWeight: "900",
                    fontSize: "45px",
                    textDecoration: "uppercase",
                }}
            >
                Почему именно мы
            </h1>
            <div
                className="carousel-container"
                style={{
                    display: "flex",
                    justifyItems: 'center',
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-around",
                }}
            >
                <div
                    className="arrow"
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        onClick={prevSlide}
                        src="/icons/shevron.svg"
                        style={{
                            width: "40px",
                            cursor: currentPosition === 0 ? "default" : "pointer",
                        }}
                    />
                </div>
                <div
                    style={{
                        maxWidth: screenWidth >= 1375 ? '1270px' : screenWidth >= 924 ? '840px' : screenWidth >= 575 ? '410px' : '290px',
                        overflowX: "hidden",
                    }}
                >
                    <div
                        className="carousel-track"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "flex-start",
                            padding: "5px 5px",
                            transform: `translateX(${currentPosition}px)`,
                            transition: "transform 0.5s ease-in-out",
                        }}
                    >
                        {text.map((item, ind) => (
                            <React.Fragment key={ind}>
                                <CarouselCard text={item} svg={icons[ind]} screen={screenWidth >= 575 ? 'pc' : 'mobile'} />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div
                    className="arrow"
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        onClick={nextSlide}
                        src="/icons/shevron.svg"
                        style={{
                            transform: "rotate(180deg)",
                            cursor: currentPosition === maxScroll ? "default" : "pointer",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;
