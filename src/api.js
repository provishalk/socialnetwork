import axios from 'axios';
const user = JSON.parse(localStorage.getItem("user"));
export default axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { Authorization: `Bearer ${user?.token}` }
});