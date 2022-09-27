import axios from 'axios';
const base_url = "http://localhost:8080" || `${process.env.HOST}:${process.env.PORT}`;
const api_url = base_url + "/api";

// login Function here..
const login = async (data) => {
    try {
        const response = await axios.post(`${api_url}/login`, data);
        return response;

    } catch (error) {
        console.log("ERR! : When try to POST request into login API endpoint. ", error.message);
    }
};

// First time check health of API..
const checkHealth = async () => {
    try {
        const healthCall = await axios.get(`${base_url}/health`);
        console.log(healthCall.data);

    } catch (error) {
        console.log("ERR! : When try to GET request into health API endpoint.", error.message);
    }
};

module.exports = {
    login,
    checkHealth,
};