import axios from "axios";

export const getSingleUser = async () => {
    try{
        const token = localStorage.getItem("token");
        const res =  await axios.get("http://localhost:4000/api/messages/user", {
            headers: {
                Authorization: `Bearer ${token}`,   
        }
    });
        return res.data;
    } catch (e) {
        console.log("Error fetching user:", e);
    }
};