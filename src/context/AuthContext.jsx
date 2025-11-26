// context/AuthContext.jsx
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { loginAxios } from '../api/loginApi';

const defaultAuthcontext = {
    isAuthenticated: !!(localStorage.getItem('token') && localStorage.getItem('expirationToken')),
    login: () => {},
    logout: () => {},
    token: null,
    tokenExpirationTime: null,
    loginError: null
};

const AuthContext = createContext(defaultAuthcontext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
    const [tokenExpirationTime, setTokenExpirationTime] = useState(localStorage.getItem('expirationToken') ? localStorage.getItem('expirationToken') : null);
    const [loginError, setLoginError] = useState('');

    const getLogin = async (data) => {
        try {
            const result = await loginAxios(data);
            setIsAuthenticated(true);
            setToken(result.accessToken);
            setTokenExpirationTime(result.expire);
            localStorage.setItem('token', result.accessToken);
            localStorage.setItem('expirationToken', result.expire);
            setLoginError(null);
            return result;
        } catch (err) {
            if (err.message === "Неправильное имя или пароль") {
                setLoginError("Неправильное имя или пароль");
                console.log(err, "Неправильное имя или пароль");
            }
        }
    };

    const logoutFunc = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        setToken(null);
        setTokenExpirationTime(null);
        window.location.reload();
    };

    useEffect(() => {
        if (token && tokenExpirationTime) {
            const now = new Date();
            const exp = new Date(tokenExpirationTime);
            if (((+exp - +now) / (1000 * 60)) > 10) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }
    }, [token, tokenExpirationTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (token && tokenExpirationTime) {
                const now = new Date();
                const exp = new Date(tokenExpirationTime);
                if (((+exp - +now) / (1000 * 60)) > 10) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [token, tokenExpirationTime]);

    const login = useCallback((data) => getLogin(data), []);
    const logout = useCallback(() => logoutFunc(), []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, loginError, logout, token, tokenExpirationTime }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
