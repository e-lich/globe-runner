import axios from "axios";

export const isUserLoggedIn = async () => {
    const user = await axios.get("/user/current");
    if (user.data[0] === "User not logged in") {
        return false;
    }
    return true;
}
