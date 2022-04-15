/*  camelcase */
export default {
    first_name : [ 'required', 'trim', 'string' ],
    last_name  : [ 'required', 'trim', 'string' ],
    phone      : [ 'required', 'trim', 'integer', { min_length: 12 } ],
    city       : [ 'required', 'trim', 'string' ],
    position   : [ 'required', 'trim', 'string' ],
    kitchen    : [ 'required', 'trim', 'string' ],
    status     : [ 'required', 'trim', 'string' ]
};
