// api/auth.js
import axios from 'axios';

// Устанавливаем URL API
// const API_URL = import.meta.env.BASE_URL;
// Эндпоинты для работы с пользователями
// const loginEndpoint = `${API_URL}api/v1/account/login`;
const loginEndpoint = `https://gateway.scan-interfax.ru/api/v1/account/login`;

export const loginAxios = async (data) => {
    try {
        const response = await axios({
            url: loginEndpoint,
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data),
        });
        return response.data;
    } catch (err) {
        if (err.response?.data?.message?.includes("Неправильное имя или пароль")) {
            throw new Error("Неправильное имя или пароль");
        } else {
            throw new Error(err.message || "Ошибка при авторизации");
        }
    }
};
