"use client";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import toast from "react-hot-toast";

type Props = {
  userId: string;
};

export default function NotificationListener({ userId }: Props) {
  useEffect(() => {
    const socket = getSocket();

    if (userId) {
      console.log("userId", userId);

      socket.emit("register", userId);
    }

    socket.on("new_notification", (data) => {
      toast.success(data.content || "You have a new notification");
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return null;
}
