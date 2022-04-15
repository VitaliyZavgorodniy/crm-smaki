import LIVR from 'livr';

import rules from './rules';


LIVR.Validator.defaultAutoTrim(true);
const REQUIRED_ERRORS = {
    phone    : 'Обязательное поле',
    password : 'Обязательное поле'
};

const TOO_SHORT_ERRORS = {
    phone    : 'Минимум 17 символов',
    password : 'Минимум 8 символов'
};

const WRONG_FORMAT_ERRORS = {
    phone  : 'Неверный формат номера',
    client : 'Неверный формат номера'
};

const INVALID_LOGIN_DATA = {
    phone : 'Неверный номер или пароль'
};

function validate({ rule, data, onSuccess, onError }) {
    const validator = new LIVR.Validator(rule);

    const validData = validator.validate(data);

    if (validData) {
        if (onSuccess) onSuccess(validData);
    } else {
        const decodedErrors = decodeErrorObject(validator.getErrors());

        if (onError) onError(decodedErrors);
    }
}

export function validateCreateSession(args) {
    return validate({ rule: rules.createSession, ...args });
}

export function validateUser(args) {
    return validate({ rule: rules.user, ...args });
}

export function validateProduct(args) {
    return validate({ rule: rules.product, ...args });
}

export function validateFirstStepOrder(args) {
    return validate({ rule: rules.orders.firstStep, ...args });
}

export function validateSecondStepOrder(args) {
    return validate({ rule: rules.orders.secondStep, ...args });
}

export function validateThirdStepOrder(args) {
    return validate({ rule: rules.orders.thirdStep, ...args });
}

export function decodeErrorObject(errors) {
    const decodedErrors = { ...errors };

    for (const field in decodedErrors) {
        if (decodedErrors.hasOwnProperty(field)) {
            const errorField = field.replace('data/', '');

            decodedErrors[errorField] = decodeErrorCode(decodedErrors[field], errorField);
        }
    }

    return decodedErrors;
}

export function decodeErrorCode(code, field = '') {
    if (typeof code === 'object') {
        const errors = {};

        Object.keys(code).forEach(el => {
            errors[el] = getErrorMessage(code[el], field);
        });

        return errors;
    }

    const errorMessage = getErrorMessage(code, field);

    return errorMessage;
}

function getErrorMessage(code, field) {
    switch (code) {
        case 'REQUIRED': {
            const errorMessage = field && REQUIRED_ERRORS[field];

            return errorMessage || 'Обязательное поле';
        }

        case 'TOO_SHORT': {
            const errorMessage = field && TOO_SHORT_ERRORS[field];

            return errorMessage || 'Слишком короткое значение';
        }

        case 'NOT_INTEGER': {
            const errorMessage = field && WRONG_FORMAT_ERRORS[field];

            return errorMessage || 'Требуется числовое значение';
        }

        case 'INVALID_LOGIN_DATA': {
            const errorMessage = field && INVALID_LOGIN_DATA[field];

            return errorMessage || 'Неверные данные';
        }

        default:
            return code;
    }
}
