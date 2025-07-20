"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Bell, MessageSquare } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Insyd</h1>
        <p className="text-gray-600">Social Media Platform for Architects - Notification POC</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Users
            </CardTitle>
            <CardDescription>View all users and follow other architects</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/users">
              <Button className="w-full">View Users</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>View real-time notifications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/notifications">
              <Button className="w-full">View Notifications</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Create Post
            </CardTitle>
            <CardDescription>Share your architectural insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/create-post">
              <Button className="w-full">Create Post</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">POC Features:</h3>
        <ul className="text-sm space-y-1">
          <li>• Real-time notifications via WebSocket simulation</li>
          <li>• User following system</li>
          <li>• Notification storage and read status</li>
          <li>• Post creation with notifications</li>
        </ul>
      </div>
    </div>
  )
}
