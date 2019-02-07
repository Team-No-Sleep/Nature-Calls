import axios from "axios";
import { getServerUrl } from "./constants";

export default{
    login: (userObj) => {
        return axios.post(`${getServerUrl()}/auth/login`, userObj)
    },
    logout: () => {
        return axios.post(`${getServerUrl()}/auth/logout`)
    },
    getUser: () => {
        return axios.get(`${getServerUrl()}/auth/user`)
    },
    registerUser: (userObj) => {
        return axios.post(`${getServerUrl()}/auth/signup`,userObj)
    },

    getLeaderBoard: () => {
        console.log("SUH")
        return axios.get(`${getServerUrl()}/auth/leaderBoard`);
    }
}