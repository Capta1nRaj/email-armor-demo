import { GetCookiesList } from "@/utils/GetCookiesList";
import axios from "axios";

//! Logout function 
const logoutUser = async () => {
    //! Fetching cookies list
    const cookies = GetCookiesList();
    await axios.get('/api/EmailArmorAPIs/logout', { headers: { 'Content-Type': 'application/json', userName: cookies.userName, token: cookies.token, id: cookies.id } });
    window.location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME_1 || "http://localhost:3000";
};

export const menuOptions = [
    {
        name: "Dashboard",
        path: '/dashboard',
        image: 'https://img.icons8.com/?size=20&id=6690&format=png&color=000000'
    },
    {
        name: "Settings",
        path: "/settings",
        image: 'https://img.icons8.com/?size=20&id=364&format=png&color=000000'
    },
    {
        name: "Logout",
        path: "#",
        image: 'https://img.icons8.com/?size=20&id=2445&format=png&color=000000',
        onClick: logoutUser
    }
]