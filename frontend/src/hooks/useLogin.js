import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"
import { useState } from "react"
import { BaseUrl } from "../BaseUrl";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    const yourJwtCookieValue = jwtCookie ? jwtCookie.split('=')[1] : null;


    const login = async (username, password) => {
        const success = handleInputErrors(username, password);
        if (!success) return;

        setLoading(true);
        try {

            const res = await fetch(`${BaseUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `jwtCookie=${yourJwtCookieValue}` 
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Login successfully");

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }
    return { login, loading }
}

export default useLogin;


function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}