import axios from "axios";

const baseUrl = "https://nodeproject-972m.onrender.com/api/user"; 



export const loginServer = (user) => {
    return axios.post(baseUrl+"/login", user);
};

export const registerServer = (user) => {
    return axios.post(baseUrl, user);
};