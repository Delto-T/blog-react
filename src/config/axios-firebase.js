import axios from "axios";

const instance = axios.create({
    baseURL: "https://blog-react-3747b-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default instance;