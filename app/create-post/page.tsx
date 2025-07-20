"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import Link from "next/link";
interface User {
  user_id: string;
  full_name: string;
  email: string;
  followers: string[];
  following: string[];
}

export default function CreatePostPage() {
  const [currentUser, setCurrentUser] = useState<string>("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!currentUser && users && users.length > 0) {
      setCurrentUser(users[0].user_id);
    }
  }, [users && users.length && currentUser]);

  const createPost = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author_id: currentUser,
            title: postTitle,
            content: postContent,
          }),
        }
      );

      if (response.ok) {
        alert("Post created successfully!");
        setPostTitle("");
        setPostContent("");
      } else {
        console.error("Error creating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
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
          <MessageSquare className="h-8 w-8" />
          Create Post
        </h1>
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
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.full_name}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Create Post Form */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Architectural Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Post Title</label>
            <Input
              placeholder="e.g., Sustainable Building Materials in Modern Architecture"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              placeholder="Share your thoughts, insights, or recent projects..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={6}
            />
          </div>

          <Button
            onClick={createPost}
            disabled={!postTitle.trim() || !postContent.trim() || isSubmitting}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Creating Post..." : "Create Post"}
          </Button>
        </CardContent>
      </Card>

      {/* Demo Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Demo Behavior</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>
              • Creating a post will trigger notifications to simulated
              followers
            </li>
            <li>• Check the Notifications page to see real-time updates</li>
            <li>• Switch users to see different perspectives</li>
            <li>
              • In a real implementation, this would use Socket.IO and Redis
              queues
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
