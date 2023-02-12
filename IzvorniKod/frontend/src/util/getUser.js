import axios from "axios";

export const getUser = async () => {
    const user = await axios.get("/user/current");
    return user;
}
