import axios from "axios";
import Sweet from "../components/Sweet";

const baseUrl = "https://nodeproject-972m.onrender.com/api/product"; 

export  const getAllSweets = (page) => {
    return axios.get(`${baseUrl}?page=${page}&limit=2`);
};

export const getTotalSweets = () => {
    return axios.get(`${baseUrl}?limit=2`);
};

export const deleteSweet = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export const addSweet = (sweet) => {
    return axios.post(baseUrl, sweet);
};
export const editsweet = (id,sweet) => {
    return axios.put(`${baseUrl}/${id}`, sweet);
};
