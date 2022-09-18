/**
 * ---- The Common Error Handler Function ----
 * @param {*} msg 
 * @param {Number} status 
 * @returns {*}
 */
function errorHandle(msg = 'Something wrong!', status = 500) {
    const error = new Error(msg);
    error.status = status;
    console.log('ERR here == ', error)
    return error;
}

module.exports = errorHandle;