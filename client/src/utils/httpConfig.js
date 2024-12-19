// -------- CONFIG For All CORS Allows and Types of Headers and Credentials ------
const config = {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_API}`
    },
    withCredentials: true,
    mode: 'cors',
};

export default config;