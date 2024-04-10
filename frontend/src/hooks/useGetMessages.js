import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
import { BaseUrl } from "../BaseUrl"




const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    const user = JSON.parse(localStorage.getItem("chat-user"));

    useEffect(() => {

        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${BaseUrl}/api/messages/${selectedConversation._id}`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setMessages(data)
            } catch (error) {
                toast.error(error.message)

            } finally {
                setLoading(false)
            }
        }

        if (selectedConversation?._id) getMessages();

    }, [selectedConversation._id, setMessages])

    return { messages, loading }
}

export default useGetMessages