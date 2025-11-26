// components/cards/TariffCard/TariffCard.jsx
import Button from "../../Button/Button";
import "./index.css";

const TarifCard = ({ isActive, tarif }) => {
    return (
        <div
            className="tarifCard"
            style={{
                border: isActive ? `2px solid ${tarif.bg}` : "none",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
            }}
        >
            <div
                style={{
                    backgroundColor: tarif.bg,
                    height: "132px",
                    width: "100%",
                    padding: "24px",
                    boxSizing: "border-box",
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                    borderTop: `2px solid ${tarif.bg}`,
                    position: "relative",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexDirection: "column",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "30px",
                            fontWeight: "600",
                            color: tarif.textColor,
                        }}
                    >
                        {tarif.name}
                    </h2>
                    <p
                        style={{
                            fontSize: "18px",
                            color: tarif.textColor,
                            maxWidth: '230px'
                        }}
                    >
                        {tarif.description}
                    </p>
                </div>
                <img
                    src={tarif.svg}
                    alt="tarif icon"
                    style={{
                        width: "100px",
                        height: "auto",
                        position: "absolute",
                        top: "8px",
                        right: "5px",
                    }}
                />
            </div>

            <div
                style={{
                    padding: "24px",
                    boxSizing: "border-box",
                    position: "relative",
                }}
            >
                {isActive && (
                    <span
                        style={{
                            backgroundColor: "#e6f7ff",
                            color: "#1890ff",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500",
                            position: "absolute",
                            right: "10px",
                        }}
                    >
            Текущий тариф
          </span>
                )}

                <div
                    style={{
                        minHeight: "60px",
                        marginBottom: "24px",
                        marginTop: "24px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "8px",
                            marginBottom: "4px",
                        }}
                    >
            <span
                style={{
                    fontSize: "30px",
                    fontWeight: "500",
                    color: "#333333",
                }}
            >
              {tarif.priceWithDiscount} ₽
            </span>
                        <span
                            style={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#999999",
                                textDecoration: "line-through",
                            }}
                        >
              {tarif.price} ₽
            </span>
                    </div>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "18px",
                            color: "#666666",
                        }}
                    >
                        {tarif.priceCondition}
                    </p>
                </div>

                <div
                    style={{
                        height: "1px",
                        margin: "0 -24px 16px -24px",
                    }}
                />

                <div
                    style={{
                        marginTop: "24px",
                        display: 'flex',
                        flexDirection: 'column',
                        height: '224px',
                        justifyContent: 'space-between'
                    }}
                >
                    <h3
                        style={{
                            margin: "0 0 12px 0",
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#333333",
                        }}
                    >
                        В тариф входит:
                    </h3>
                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: "0",
                            listStyleType: "none",
                        }}
                    >
                        {tarif.includedInPrice.map((item, index) => (
                            <li
                                key={index}
                                style={{
                                    marginBottom: "8px",
                                    fontSize: "18px",
                                    color: "#333333",
                                }}
                            >
                                <img
                                    src="/icons/greenTick.svg"
                                    alt="checkmark"
                                    style={{ width: "20px", height: "18px", marginRight: "8px" }}
                                />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Button
                        onClickFunc={() => {}}
                        btnText={isActive ? "Перейти в личный кабинет" : "Подробнее"}
                        bg={isActive ? "#D2D2D2" : "#5970FF"}
                        textColor={isActive ? "#000000" : "#FFFFFF"}
                    />
                </div>
            </div>
        </div>
    );
};

export default TarifCard;
