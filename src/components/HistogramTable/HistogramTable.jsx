// components/SearchResultSection/HistogramTable/HistogramTable.jsx
import React, { useEffect, useState } from "react";
import HistogramCard from "../cards/HistogramCard/HistogramCard.jsx";
import "./index.css";

const HistogramTable = ({ cardsArray, isLoading }) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [numberOfVisibleItems, setNumberOfVisibleItems] = useState(0);
    const [cards, setCards] = useState([]);
    const [containerWidth, setContainerWidth] = useState(295);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setScreenWidth(screenWidth);
            const containerW = (screenWidth * 0.90) - (screenWidth > 404 ? 133 : 295) - (screenWidth > 404 ? 120 : 60);
            const numberOfVItems = screenWidth >= 404 ? Math.floor(containerW / 133) : Math.floor(containerW / 295);
            const contFinalWidth = (numberOfVItems * (screenWidth >= 404 ? 133 : 295)) > containerW ? (numberOfVItems - 1) * (screenWidth >= 404 ? 133 : 295) : numberOfVItems * (screenWidth >= 404 ? 133 : 295);
            setContainerWidth(contFinalWidth);
            setCurrentPosition(0);
            setNumberOfVisibleItems(contFinalWidth / (screenWidth >= 404 ? 133 : 295));
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        if (numberOfVisibleItems >= cardsArray[0]?.data?.length) {
            return;
        }
        setCurrentPosition((prev) =>
            (screenWidth >= 404) ? prev - 134 : prev - 295
        );
        setNumberOfVisibleItems((prev) => prev + 1);
    };

    const prevSlide = () => {
        if (screenWidth >= 404 ? numberOfVisibleItems <= Math.floor(containerWidth / 134) : true) {
            return;
        }
        setCurrentPosition((prev) =>
            (screenWidth >= 404) ? prev + 134 : prev + 295
        );
        setNumberOfVisibleItems((prev) => prev - 1);
    };

    useEffect(() => {
        if (!cardsArray || cardsArray.length === 0) {
            return;
        }

        const riskFactorsData = cardsArray.find(item => item.histogramType === 'riskFactors');
        const totalDocsData = cardsArray.find(item => item.histogramType === 'totalDocuments');

        if (!riskFactorsData || !totalDocsData) {
            return;
        }

        const cardsArr = riskFactorsData.data.map((i, ind) => ({
            date: i.date,
            riskFactors: i.value,
            totalDocs: totalDocsData.data[ind]?.value || 0
        }));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCards(cardsArr);
    }, [cardsArray]);



    return (
        <div
            className="histogramTable"
            style={{
                height: "260px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <h1
                    style={{
                        fontSize: "30px",
                        fontWeight: "900",
                        textTransform: "uppercase",
                    }}
                >
                    Общая сводка
                </h1>
                {!isLoading && <p style={{ fontSize: "18px", color: "#949494" }}>
                    Найдено {cardsArray[0]?.data?.length} вариантов
                </p>}
            </div>

            <div
                className="histogramTable_carouseldiv"
                style={{
                    marginBottom: "40px 0",
                    display: 'flex',
                    justifyContent: "flex-start",
                }}
            >
                <button
                    onClick={prevSlide}
                    className="histogramTable_arrow"
                    style={{ border: "none", borderRadius: '8px', cursor: 'pointer' }}
                >
                    <img src="/icons/shevron_right.svg" alt="prev" />
                </button>
                <div
                    className="histogramTable_scrolldiv"
                    style={{
                        display: "flex",
                        border: "4px solid #029491",
                        borderRadius: "8px",
                        width: 'fit-content',
                        overflowX: 'hidden',
                    }}
                >
                    <div
                        className="histogramTable_TableHead"
                        style={{
                            display: "flex",
                            color: "white",
                            backgroundColor: "#029491",
                            alignItems: "center",
                            zIndex: '3'
                        }}
                    >
                        <p>Период</p>
                        <p>Всего</p>
                        <p>Риски</p>
                    </div>
                    {isLoading ? (
                        <div style={{ width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <div
                            style={{
                                borderRadius: "8px",
                                width: `${containerWidth}px`,
                                minWidth: `${containerWidth}px`,
                                maxWidth: `${containerWidth}px`,
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                display: "flex",
                                borderRadius: "8px",
                                transform: `translateX(${currentPosition}px)`,
                                transition: "transform 0.5s ease-in-out",
                            }}>
                                {cards.map((item) => (
                                    <React.Fragment key={item.date + item.totalDocs}>
                                        <HistogramCard card={item} />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button
                    onClick={nextSlide}
                    className="histogramTable_arrow"
                    style={{ border: "none", borderRadius: '8px', cursor: 'pointer' }}
                >
                    <img src="/icons/shevron_right.svg" alt="next" style={{ rotate: "180deg", cursor: 'pointer' }} />
                </button>
            </div>
        </div>
    );
};

export default HistogramTable;
