import axios from "axios";

export const GLOBAL_URL = process.env.REACT_APP_API_URL;

/** auth api */
export async function userSignUp(data){
    return axios.post(`${GLOBAL_URL}/auth/signUp`, data)
}
export async function userSignIn(data){
    return axios.post(`${GLOBAL_URL}/auth/signIn`, data)
}

//logout

export const HandleLogOut = () => {
    localStorage.removeItem('token')
    return;
};