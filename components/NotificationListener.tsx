"use client";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";

type Props = {
  userId: string;
  onNotification?: (data: any) => void; // optional handler
};

export default function NotificationListener({
  userId,
  onNotification,
}: Props) {
  useEffect(() => {
    const socket = getSocket();

    if (userId) {
      socket.emit("register", userId); // Register userId with server
    }

    socket.on("new_notification", (data) => {
      console.log("🔔 New notification received:", data);
      if (onNotification) onNotification(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return null;
}
