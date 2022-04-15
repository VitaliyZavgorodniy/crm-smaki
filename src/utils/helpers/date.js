import 'moment/locale/ru';

import moment from 'moment';

import { capitalizeString } from './string';

export function getDate(format, isCapitalize = true) {
    const date = moment().format(format);

    if (isCapitalize) {
        return capitalizeString(date);
    }

    return date;
}

export function getDateDifference(date) {
    let hours = moment().diff(date, 'hours');

    let minutes = (moment().diff(date, 'minutes') % 60).toFixed(0);

    if (`${minutes.replace('-', '')}`.length === 1) {
        minutes = `0${minutes}`;
    }

    if (`${hours}`.length === 1) {
        hours = `0${hours}`;
    }

    return { hours, minutes };
}
