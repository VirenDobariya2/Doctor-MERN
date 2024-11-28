import axios from "axios"; 

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL : 'https://localhost:3000/api/',
  headers: {
    authorization: token,
    "Content-Type": "application/json",
    timeout : 1000,
  }, 
  // .. other options
});

export default instance;