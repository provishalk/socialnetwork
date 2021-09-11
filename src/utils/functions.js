import moment from "moment";
import { DEFAULT_USER_PROFILE } from "./constants";

export const isLoggedIn = () => {
    return localStorage.getItem("user")!=null; 
}
export const getAccessTokenFromLocalStorage = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
}

export const getActualTime = (postedTime) =>{
    return moment(postedTime).fromNow(true);
}

export const getUserImgFromLocalStorage = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.imgUrl ? `${user?.imgUrl}?${Date.now()}` : DEFAULT_USER_PROFILE;
}