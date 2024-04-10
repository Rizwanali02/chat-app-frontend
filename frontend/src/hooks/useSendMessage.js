import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
import { BaseUrl } from "../BaseUrl"


const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();
    const user = JSON.parse(localStorage.getItem("chat-user"));
    
    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await fetch(`${BaseUrl}/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({ message })
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)

        } finally {
            setLoading(false)
        }

    }

    return { loading, sendMessage }
}

export default useSendMessage