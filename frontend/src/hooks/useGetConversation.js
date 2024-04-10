import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { BaseUrl } from "../BaseUrl";

const useGetConversations = () => {

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const user = JSON.parse(localStorage.getItem("chat-user"));
    console.log(user);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${BaseUrl}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                })
                const data = await res.json()
                if (data.error) throw new Error(error.message)
                setConversations(data);
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        getConversations();
    }, [])

    return { loading, conversations }

}

export default useGetConversations