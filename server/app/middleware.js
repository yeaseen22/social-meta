const morgan = require("morgan"), 
    cors = require("cors"), 
    bodyParser = require("body-parser"), 
    cookieParser = require("cookie-parser");


const middleware = [
    morgan('dev'),
    cors(),
    bodyParser.json(),
    cookieParser()
];


module.exports = middleware;