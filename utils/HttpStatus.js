const HttpStatus = Object.freeze({
    OK:200,
    NO_CONTENT:204,
    NOT_FOUND:404,
    FORBIDDEN:403, 
    UNAUTHORIZED:401,
    BAD_REQUEST:400, 
    CONFLICT:409
});

module.exports = HttpStatus;