/*  camelcase */
export default {
    firstStep : {
        address : { 'nested_object' : {
            city_sync_id : { 'nested_object': { value: [ 'required', 'trim', 'string' ] } },
            street       : [ 'required', 'trim', 'string', { 'min_length': 3 } ],
            house_number : [ 'required', 'trim', 'string' ],
            entrance     : [ 'required', 'trim', 'integer' ],
            floor        : [ 'required', 'trim', 'integer' ]
        } },
        client : { 'nested_object' : {
            name   : [ 'required', 'trim', 'string' ],
            phone  : [ 'required', 'trim', 'integer', { min_length: 12 } ],
            source : { 'nested_object': { value: [ 'required', 'trim', 'string' ] } },
            id     : [ 'trim', 'string' ]
        } },
        restaurant   : { 'nested_object': { value: [ 'required', 'trim', 'string' ] } },
        kitchen_code : { 'nested_object': { value: [ 'required', 'trim', 'string' ] } },
        payment_type : { 'nested_object': { value: [ 'required', 'trim', 'string' ] } },
        return_call  : [ 'required', 'trim', 'integer' ]
    },
    secondStep : {
        id : [ 'required', 'trim', 'string' ]
    },
    thirdStep : {
        courier_id : [ 'required', 'trim', 'string' ],
        cook       : [ 'required', 'trim', 'string' ]
    }
};
