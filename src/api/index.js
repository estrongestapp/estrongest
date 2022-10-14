import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export async function signUp(newUser) {
    await axios.post(`${BASE_URL}/user/signup`, newUser);
}

export async function signIn(user) {
    return await axios.post(`${BASE_URL}/user/signin`, user);
}

export async function saveProgress(progress, user) {
    await axios.post(`${BASE_URL}/infos`, {
        user,
        infos: progress,
    });
}