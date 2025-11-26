// components/Header/BurgerMenu/BurgerMenu.jsx
import Button from "../Button/Button.jsx";
import { useAuth } from "../../context/AuthContext";
import "./index.css";
import { createPortal } from "react-dom";
import { useState } from "react";

const BurgerMenu = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const toggleMenu = () => {
        if (isOpen) {
            setIsMounted(false);
            document.body.style.overflow = "auto";
            setTimeout(() => setIsOpen(false), 400);
        } else {
            setTimeout(() => setIsMounted(true), 400);
            document.body.style.overflow = "hidden";
            setIsOpen(true);
        }
    };

    const portalRoot = document.getElementById("portal-root");
    if (!portalRoot) return null;

    return (
        <>
            <div
                className="burgerMenuIcon"
                onClick={toggleMenu}
                style={{
                    height: "25px",
                    width: "30px",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    cursor: "pointer",
                    zIndex: 1001,
                }}
            >
                <div
                    style={{
                        width: "35px",
                        height: "5px",
                        backgroundColor: isOpen ? "#FFFFFF" : "#029491",
                        transform: isOpen ? "rotate(45deg) translate(7px, 8px)" : "none",
                        transition: "all 0.4s ease",
                    }}
                />
                <div
                    style={{
                        width: "35px",
                        height: "5px",
                        backgroundColor: isOpen ? "#FFFFFF" : "#029491",
                        opacity: isOpen ? 0 : 1,
                        transition: "all 0.4s ease",
                    }}
                />
                <div
                    style={{
                        width: "35px",
                        height: "5px",
                        backgroundColor: isOpen ? "#FFFFFF" : "#029491",
                        transform: isOpen ? "rotate(-45deg) translate(5px, -7px)" : "none",
                        transition: "all 0.4s ease",
                    }}
                />
            </div>
            {isOpen && createPortal(
                <div>
                    <div
                        className="menu-overlay"
                        onClick={toggleMenu}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            opacity: isMounted ? 1 : 0,
                            visibility: isMounted ? "visible" : "hidden",
                            transition: "opacity 0.4s ease",
                            zIndex: 999,
                        }}
                    />
                    <div
                        className="burger-menu-content"
                        style={{
                            position: "fixed",
                            top: 0,
                            right: 0,
                            width: "100%",
                            maxWidth: "100%",
                            height: "100%",
                            zIndex: 1000,
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                right: isMounted ? "0" : "-100%",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#029491",
                                transition: "right 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />
                        <div
                            style={{
                                position: "relative",
                                height: "100%",
                                padding: "20px",
                                opacity: isMounted ? 1 : 0,
                                transition: "opacity 0.4s ease 0.2s",
                                zIndex: 1001,
                            }}
                        >
                            <img
                                className="BurgerMenuScanLogo"
                                src="/icons/FooterLogo.svg"
                                alt="CKAH Logo"
                                style={{
                                    width: "100px",
                                    height: "auto",
                                    marginLeft: "0px",
                                    marginTop: "-23px",
                                    alignSelf: "flex-start",
                                }}
                            />
                            <nav>
                                <ul
                                    style={{
                                        width: "full",
                                        display: "flex",
                                        flexDirection: "column",
                                        listStyle: "none",
                                        gap: "30px",
                                        alignItems: "center",
                                        padding: "0",
                                    }}
                                >
                                    <li>
                                        <a
                                            href="/"
                                            style={{
                                                textDecoration: "none",
                                                color: "#fff",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Главная
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            style={{
                                                textDecoration: "none",
                                                color: "#fff",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Тарифы
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            style={{
                                                textDecoration: "none",
                                                color: "#fff",
                                                fontSize: "16px",
                                            }}
                                        >
                                            FAQ
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            <div
                                style={{
                                    width: "100%",
                                    gap: "18px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <a
                                    href=""
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        opacity: "0.4",
                                        padding: "8px 0",
                                        borderRadius: "4px",
                                        fontSize: "16px",
                                    }}
                                >
                                    Зарегистрироваться
                                </a>
                                {isAuthenticated ? (
                                    <button
                                        onClick={logout}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            color: "white",
                                            fontSize: "16px",
                                            padding: "8px 16px",
                                        }}
                                    >
                                        Выйти
                                    </button>
                                ) : (
                                    <Button
                                        onClickFunc={() => {}}
                                        btnText={
                                            <a
                                                href="/login"
                                                style={{ textDecoration: "none", color: "#000000" }}
                                            >
                                                Войти
                                            </a>
                                        }
                                        bg="#7CE3E1"
                                        textColor="#000000"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                portalRoot
            )}
        </>
    );
};

export default BurgerMenu;
