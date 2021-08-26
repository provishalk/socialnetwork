export const isLoggedIn = () => {
    return localStorage.getItem("user")!=null;
}
