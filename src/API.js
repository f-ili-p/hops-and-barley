import axios from "axios";

// create axios instance with baseUrl and timeout
const instance = axios.create({
    baseURL: "https://api.openbrewerydb.org",
    timeout: 6000,
});

export default instance;
