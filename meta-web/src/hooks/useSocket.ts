import { useEffect } from "react";
import { socket } from "@/lib/socket"; // Import singleton socket instance

const useSocket = (eventName: string, callback: (data: any) => void) => {
  useEffect(() => {
    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);

  return socket;
};

export default useSocket;
