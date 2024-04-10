import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notification from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                newMessage.shouldShake = true;
                const sound = new Audio(notification);
                sound.play();
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.off("newMessage");
            };
        }
    }, [socket, setMessages]);
};

export default useListenMessages;
