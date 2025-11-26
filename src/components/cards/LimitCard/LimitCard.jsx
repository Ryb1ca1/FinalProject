// components/Header/LimitCard/LimitCard.jsx
import { useEffect, useState, useCallback } from "react";
import { useLazyRequestAccInfoQuery } from "../../../services/loginService";
import { useAuth } from "../../../context/AuthContext";
import "./index.css";

const LimitCard = () => {
    const { token } = useAuth();
    const [userData, setUserData] = useState(null);
    const [requestUserInfo, { isLoading }] = useLazyRequestAccInfoQuery();

    const requestUserInfoFunc = useCallback(async () => {
        if (token) {
            try {
                const result = await requestUserInfo(token).unwrap();
                setUserData(result);
            } catch (err) {
                console.log(err);
            }
        }
    }, [token, requestUserInfo]);

    useEffect(() => {
        if (!token) return;
        const run = async () => {
            await requestUserInfoFunc();
        };
        void run();
    }, [token, requestUserInfoFunc]);

    return (
        <div
            className="limitCard"
            style={{
                width: "175px",
                minWidth: "175px",
                height: "63px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: '2px 8px',
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#D9D9D9",
                boxSizing: "border-box",
                margin: '0 20px',
            }}
        >
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "10px",
                                color: "#666",
                                margin: "0"
                            }}
                        >
                            Использовано компаний <b style={{
                            fontSize: "14px", color: 'black'
                        }}>{userData?.eventFiltersInfo.usedCompanyCount}</b>
                        </p>
                        <p
                            style={{
                                fontSize: "10px",
                                color: "#666",
                                margin: "0",
                            }}
                        >
                            Лимит по компаниям <b style={{
                            fontSize: "14px", fontWeight: '700',
                            color: "#8AC540",
                        }}>{userData?.eventFiltersInfo.companyLimit}</b>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LimitCard;
