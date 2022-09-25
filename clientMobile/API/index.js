import axios from 'axios';
const base_url = "http://localhost:8080" || `${process.env.HOST}:${process.env.PORT}`;
const api_url = base_url + "/api";

// login Function here..
const login = async (data) => {
    const response = await axios.post(`${api_url}/login`, data);
    console.log(response.data);
};

const checkHealth = async () => {
    const healthCall = await axios.get(`${base_url}/health`);
    console.log(healthCall.data);
};

module.exports = {
    login,
    checkHealth,
};