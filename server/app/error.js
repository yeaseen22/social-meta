/**
 * ==== Not Found ====
 * @param {*} _req 
 * @param {*} _res 
 * @param {*} next 
 */
const notFoundMiddleware = (_req, _res, next) => {
    const error = new Error('Resource Not Found!');
    error.status = 404;
    next(error);
};

/**
 * ==== Error Handler ====
 * @param {*} error 
 * @param {*} _req 
 * @param {*} res 
 * @returns 
 */
const errorHandlerMiddleware = (error, _req, res) => {
    // console.log('Global handler -- ', error);
    if (error.status){
        return res.status(error.status).json({
            message: error.message
        });
    }
    return res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = {
    notFoundMiddleware,
    errorHandlerMiddleware
};