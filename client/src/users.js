import axios from "axios";
import {url} from "./config";
// Список пользователей
export const getAllUsers = (id) => {
    axios.post(`${url}/allUsers`, {id: id})
        .then((response) => {
            console.log(JSON.stringify(response))
        })
        .catch(error => console.error(`Error: ${error}`))
};
