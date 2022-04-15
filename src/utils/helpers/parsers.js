export const parsePhone = phone => {
    const NOT_ALLOWED_SYMBOLS = [ '+', '(', ')', ' ', '-' ];

    let output = '';

    for (let i = 0; i < phone.length; i++) {
        const symbol = phone[i];

        if (NOT_ALLOWED_SYMBOLS.includes(symbol)) {
            continue;
        } else {
            output += symbol;
        }
    }

    return output;
};
