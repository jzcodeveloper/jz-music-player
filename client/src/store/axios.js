import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jz-music-player.herokuapp.com/api"
  /* baseURL: "http://localhost:5001/api" */
});

export default axiosInstance;
