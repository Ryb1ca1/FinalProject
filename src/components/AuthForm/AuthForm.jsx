// components/Login_Reg_Form/Login_Reg_Form.jsx
import { useRef, useState } from "react";
import "./index.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const isFormValid = login.trim() !== '' && password.trim() !== '';
    const holdTimerRef = useRef(null);

    const { login: loginFunc, loginError } = useAuth();
    const navigate = useNavigate();

    const redirect = () => {
        navigate('/');
    };

    const handleMouseDown = () => {
        holdTimerRef.current = setTimeout(() => {
            setShowPassword(true);
        }, 300);
    };

    const handleMouseUp = () => {
        clearTimeout(holdTimerRef.current);
        setShowPassword(false);
    };

    const submitFunc = async () => {
        const obj = {
            login: login.trim(),
            password: password.trim()
        };
        if (login.length > 0 && password.length > 0) {
            try {
                const response = await loginFunc(obj);
                if (response !== undefined) {
                    redirect();
                }
            } catch (err) {
                console.log(err, 'login error AuthForm');
            }
        }
    };

    return (
        <div
            className="authForm_container"
            style={{
                margin: "0 auto",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                position: "relative",
                padding: "25px 25px 39px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
            }}
        >
            <img
                className="authForm_lock_img"
                src="/icons/AuthLock.svg"
                alt="AuthLock"
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "26px",
                    width: "100%",
                }}
            >
                <button
                    style={{
                        border: "none",
                        background: "none",
                        backgroundColor: 'none',
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#029491",
                        cursor: "pointer",
                        borderBottom: "solid 1px #029491",
                        width: '44%',
                        boxSizing: "border-box",
                        height: "29px",
                    }}
                >
                    Войти
                </button>
                <button
                    style={{
                        border: "none",
                        backgroundColor: 'none',
                        background: "none",
                        fontSize: "16px",
                        color: "#999999",
                        cursor: "not-allowed",
                        borderBottom: "solid 1px",
                        width: '54%',
                        boxSizing: "border-box",
                        height: "29px",
                    }}
                    disabled
                >
                    Зарегистрироваться
                </button>
            </div>
            <div style={{ marginBottom: "24px", width: "90%" }}>
                <label
                    style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        color: "#949494",
                        width: '100%',
                    }}
                >
                    Логин или номер телефона:
                </label>
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    style={{
                        width: "100%",
                        minWidth: '100%',
                        padding: "12px",
                        border: loginError ? "1px solid red" : "1px solid #d9d9d9",
                        borderRadius: "4px",
                        fontSize: "16px",
                    }}
                    required
                />
            </div>

            <div style={{ marginBottom: "24px", width: "90%" }}>
                <label
                    style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        color: "#949494",
                    }}
                >
                    Пароль:
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        minWidth: '100%',
                        padding: "12px",
                        border: loginError ? "1px solid red" : "1px solid #d9d9d9",
                        borderRadius: "4px",
                        fontSize: "16px",
                    }}
                    required
                />
                <button
                    type="button"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6b7280',
                        fontSize: '14px'
                    }}
                >
                    {showPassword ? 'Скрыть' : 'Показать пароль'}
                </button>
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            </div>

            <button
                className="AuthForm_submitButton"
                style={{
                    width: "100%",
                    padding: "12px",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                    cursor: isFormValid ? 'pointer' : 'not-allowed',
                    backgroundColor: isFormValid ? '#029491' : '#88d7d5',
                    transition: 'background-color 0.3s ease, transform 0.1s ease',
                }}
                disabled={!isFormValid}
                onClick={async () => {
                    await submitFunc();
                    console.log('clicked', login, password);
                }}
            >
                Войти
            </button>

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "24px",
                    alignSelf: "center",
                    borderBottom: "solid #5970FF 1px",
                }}
            >
                <a
                    href="#"
                    style={{
                        color: "#5970FF",
                        textDecoration: "none",
                        fontSize: "14px",
                        height: "59px",
                    }}
                >
                    Восстановить пароль
                </a>
            </div>

            <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <span
            style={{
                color: "#999999",
                fontSize: "14px",
                position: "relative",
                display: "inline-block",
                padding: "0 10px",
                backgroundColor: "#fff",
            }}
        >
          Войти через:
        </span>
                <div
                    style={{
                        borderTop: "1px solid #f0f0f0",
                        marginTop: "-8px",
                        zIndex: "-1",
                    }}
                ></div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "16px",
                    marginBottom: "16px",
                }}
            >
                <a href="">
                    <img src="/icons/google.svg" alt="google" />
                </a>
                <a href="">
                    <img src="/icons/facebook.svg" alt="facebook" />
                </a>
                <a href="">
                    <img src="/icons/yandex.svg" alt="yandex" />
                </a>
            </div>
        </div>
    );
};

export default AuthForm;
