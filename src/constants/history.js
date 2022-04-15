import qhistory from 'qhistory';

import { parse, stringify } from 'utils/query';

const createBrowserHistory = require('history').createBrowserHistory;

const history = qhistory(
    createBrowserHistory(),
    stringify,
    parse
);

export default history;