"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, ArrowLeft, User, MessageSquare } from "lucide-react";
import Link from "next/link";

//  notification_id: "$_id",
//         sender: 1,
//         receiver: 1,
//         type: 1,
//         content: 1,
//         isRead: 1,
//         created_at: 1,
//         updated_at: 1,
interface Notification {
  notification_id: string;
  type: "follow" | "post" | "comment";
  sender: string;
  receiver: string;
  content: string;
  isRead: boolean;
  created_at: string;
  updated_at: string;
}
interface User {
  user_id: string;
  full_name: string;
  email: string;
  followers: string[];
  following: string[];
}
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");

  const [users, setUsers] = useState<User[]>([]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/list`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);

      const data = await response.json();
      if (data && data.result) {
        setUsers(data.result);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (currentUser == "" && users && users.length > 0) {
      setCurrentUser(users[0].user_id);
    }
  }, [users && users.length && currentUser]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/list?user_id=${currentUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);

      const data = await response.json();
      if (data && data.result) {
        setNotifications(data.result);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchNotifications();
  }, [currentUser]);

  const userNotifications = notifications.filter(
    (n) => n.receiver === currentUser
  );
  const unreadCount = userNotifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "follow":
        return <User className="h-4 w-4" />;
      case "post":
        return <MessageSquare className="h-4 w-4" />;
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleMarkRead = async (
    notification_id?: string,
    markAsRead?: boolean
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/mark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: currentUser,
            notification_id: notification_id ? notification_id : undefined,
            markAll: markAsRead,
          }),
        }
      );
      console.log("Response:", response);

      const data = await response.json();
      if (data) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="h-8 w-8" />
          Notifications
        </h1>
        {unreadCount > 0 && (
          <Badge variant="destructive">{unreadCount} unread</Badge>
        )}
      </div>

      {/* Current User Selector */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current User (Simulation)</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {users && users.length > 0 ? (
              users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.full_name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No users found
              </option>
            )}
          </select>
        </CardContent>
      </Card>

      {/* Mark All Read Button */}
      {unreadCount > 0 && (
        <div className="mb-4">
          <Button
            onClick={() => {
              handleMarkRead(undefined, true);
            }}
            variant="outline"
            size="sm"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      )}

      {/* Real-time Status */}
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700">
            Real-time notifications active
          </span>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {userNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No notifications yet. Try following some users!
            </CardContent>
          </Card>
        ) : (
          userNotifications.map((notification) => (
            <Card
              key={notification.notification_id}
              className={`transition-all ${
                !notification.isRead
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`p-2 rounded-full ${
                        !notification.isRead ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`${
                          !notification.isRead ? "font-semibold" : ""
                        }`}
                      >
                        {notification.content}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatTimestamp(
                          notification.created_at
                            ? new Date(notification.created_at)
                            : new Date()
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <>
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                        <Button onClick={() => {}} variant="ghost" size="sm">
                          <Check className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Demo Instructions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Demo Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>
              • Go to the Users page and follow someone to trigger a
              notification
            </li>
            <li>• Create a post to generate post notifications</li>
            <li>• Switch between users to see different notification feeds</li>
            <li>• Notifications appear in real-time (simulated)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
