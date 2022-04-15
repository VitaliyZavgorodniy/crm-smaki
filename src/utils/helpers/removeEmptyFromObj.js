export const removeEmpty = (obj) => {
    let params = {};

    if (obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key].length == 0) {
                delete obj[key];
            }
        });

        params = obj;
    }
    return params;
}