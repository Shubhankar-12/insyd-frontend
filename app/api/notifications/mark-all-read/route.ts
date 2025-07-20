import { type NextRequest, NextResponse } from "next/server"

// Simulated notification storage
let notifications: any[] = []

export async function PATCH(request: NextRequest) {
  const { userId } = await request.json()

  // Simulate MongoDB update
  notifications = notifications.map((n) => (n.toUserId === userId ? { ...n, read: true } : n))

  return NextResponse.json({ success: true })
}
