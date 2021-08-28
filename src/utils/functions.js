export const isLoggedIn = () => {
    return localStorage.getItem("user")!=null; 
}
export const getAccessTokenFromLocalStorage = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
}