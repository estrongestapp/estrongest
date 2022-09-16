import axios from "axios";

const BASE_URL = 'http://localhost:4000';

export async function signUp(newUser) {
    await axios.post(`${BASE_URL}/signup`, newUser);
}