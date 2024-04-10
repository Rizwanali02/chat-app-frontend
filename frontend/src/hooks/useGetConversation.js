import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { BaseUrl } from "../BaseUrl";

const useGetConversations = () => {

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const user = localStorage.getItem("chat-user");

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${BaseUrl}/api/users/${user?._id}`)
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