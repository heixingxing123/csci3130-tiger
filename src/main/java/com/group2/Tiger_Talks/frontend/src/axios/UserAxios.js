import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export const findUsersByKeyword = (searchQuery, userEmail) => {
    return axios
        .get(`${URL}/api/search/users/${searchQuery}/${userEmail}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching users", error);
            throw error;
        });
};

export const getUserProfileByEmail = async (email) => {
    try {
        const response = await axios.get(`${URL}/api/user/getByEmail/${email}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

