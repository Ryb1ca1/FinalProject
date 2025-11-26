// utils/validation.js
const validateINN = (inn) => {
    const cleaned = inn.replace(/\D/g, '');

    if (cleaned.length !== 10 && cleaned.length !== 12) {
        return {
            isValid: false,
            error: 'ИНН должен содержать 10 или 12 цифр'
        };
    }

    if (!/^\d+$/.test(cleaned)) {
        return {
            isValid: false,
            error: 'ИНН должен содержать только цифры'
        };
    }

    if (cleaned.length === 10) {
        const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8];
        let sum = 0;

        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleaned[i]) * weights[i];
        }

        const controlNumber = (sum % 11) % 10;

        if (parseInt(cleaned[9]) !== controlNumber) {
            return {
                isValid: false,
                error: 'Неверная контрольная сумма для 10-значного ИНН'
            };
        }
    }

    if (cleaned.length === 12) {
        const weights1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        const weights2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

        let sum1 = 0;
        let sum2 = 0;

        for (let i = 0; i < 10; i++) {
            sum1 += parseInt(cleaned[i]) * weights1[i];
        }

        const controlNumber1 = (sum1 % 11) % 10;

        for (let i = 0; i < 11; i++) {
            sum2 += parseInt(cleaned[i]) * weights2[i];
        }

        const controlNumber2 = (sum2 % 11) % 10;

        if (parseInt(cleaned[10]) !== controlNumber1 ||
            parseInt(cleaned[11]) !== controlNumber2) {
            return {
                isValid: false,
                error: 'Неверная контрольная сумма для 12-значного ИНН'
            };
        }
    }

    return { isValid: true };
};

const validateDates = (startDate, endDate) => {
    const result = {
        isValid: true,
        errors: {
            startDate: '',
            endDate: '',
            dateRange: ''
        }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!startDate) {
        result.errors.startDate = 'Укажите дату начала';
        result.isValid = false;
    } else {
        const start = new Date(startDate);
        if (start > today) {
            result.errors.startDate = 'Дата начала не может быть в будущем';
            result.isValid = false;
        }
    }

    if (!endDate) {
        result.errors.endDate = 'Укажите дату окончания';
        result.isValid = false;
    } else {
        const end = new Date(endDate);
        if (end > today) {
            result.errors.endDate = 'Дата окончания не может быть в будущем';
            result.isValid = false;
        }
    }

    if (result.errors.startDate === '' && result.errors.endDate === '') {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            result.errors.dateRange = 'Дата начала должна быть раньше или равна дате окончания';
            result.isValid = false;
        }
    }

    return result;
};

export { validateINN, validateDates };
