"use client";

import { useState, useEffect, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import NotificationListener from "@/components/NotificationListener";
interface User {
  user_id: string;
  full_name: string;
  email: string;
  followers: string[];
  following: string[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [newUserName, setNewUserName] = useState("");
  const [Email, setEmail] = useState("");

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
    if (!currentUser && users && users.length > 0) {
      setCurrentUser(users[0].user_id);
    }
  }, [users && users.length && currentUser]);

  const handleAddUser = async () => {
    if (!newUserName.trim() || !Email.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ full_name: newUserName, email: Email }),
        }
      );

      if (response.ok) {
        fetchAllUsers();
        setNewUserName("");
        setEmail("");
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleFollow = async (userId: string, type: "follow" | "unfollow") => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-follow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            follower_id: currentUser,
            user_id: userId,
            type: type,
          }),
        }
      );

      if (response.ok) {
        fetchAllUsers();
      } else {
        console.error("Error following user:", response.statusText);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const currentUserData =
    users && users.length > 0
      ? users.find((user) => user.user_id === currentUser)
      : null;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Users</h1>
      </div>
      {currentUser && <NotificationListener userId={currentUser} />}
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
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.full_name}
                </option>
              ))}
          </select>
          {currentUserData && (
            <div className="mt-2 text-sm text-gray-600">
              Following: {currentUserData.following.length} | Followers:{" "}
              {currentUserData.followers.length}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create New User */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Create New User
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="User name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={handleAddUser}
            disabled={!newUserName.trim() || !Email.trim()}
          >
            Create User
          </Button>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users &&
          users.length > 0 &&
          users.map((user) => {
            const isCurrentUser = user.user_id === currentUser;
            const isFollowing = currentUserData?.following.includes(
              user.user_id
            );

            return (
              <Card
                key={user.user_id}
                className={isCurrentUser ? "border-blue-500 bg-blue-50" : ""}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{user.full_name}</span>
                    {isCurrentUser && <Badge variant="secondary">You</Badge>}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {user.followers.length} followers
                    </span>
                    <span>{user.following.length} following</span>
                  </div>

                  {!isCurrentUser && (
                    <Button
                      onClick={() =>
                        handleFollow(
                          user.user_id,
                          isFollowing ? "unfollow" : "follow"
                        )
                      }
                      variant={isFollowing ? "outline" : "default"}
                      size="sm"
                      className="w-full"
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
