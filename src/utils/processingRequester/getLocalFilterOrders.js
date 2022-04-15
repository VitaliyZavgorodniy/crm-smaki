import { getData } from "utils/helpers/localStorage";

export const getFiltet = () => {
    let params = {};
    let dataFilterParamsLocalStorage = getData('dataFilterCallCenter');

    if (dataFilterParamsLocalStorage) {
        //     Object.keys(dataFilterParamsLocalStorage).forEach((key) => {
        //         if (dataFilterParamsLocalStorage[key].length == 0) {
        //             delete dataFilterParamsLocalStorage[key];
        //         }
        //     });

        params = dataFilterParamsLocalStorage;
    }
    return params;
}