import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jz-music-player.herokuapp.com/api"
});

export default axiosInstance;
