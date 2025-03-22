import axios from "axios";
import Sweet from "../components/Sweet";

const baseUrl = "https://nodeproject-972m.onrender.com/api/product"; 
// const baseUrl = "http://localhost:4040/api/product";



export const getAllSweets = (page) => {
    return axios.get(`${baseUrl}?page=${page}&limit=2`);
};

export const getTotalSweets = () => {
    return axios.get(`${baseUrl}?limit=2`);
};

export const deleteSweet = (id, token) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export const addSweet = (sweet, token) => {
    return axios.post(baseUrl, sweet, {
        headers: { authorization: token }
    });
};
export const editsweet = (id, sweet, token) => {
    return axios.put(`${baseUrl}/${id}`, sweet, { headers: { authorization: token } });
};
