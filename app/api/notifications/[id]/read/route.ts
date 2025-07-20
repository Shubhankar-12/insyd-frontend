import { type NextRequest, NextResponse } from "next/server"

// Simulated notification storage
const notifications: any[] = []

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const notificationId = params.id

  // Simulate MongoDB update
  const notificationIndex = notifications.findIndex((n) => n.id === notificationId)
  if (notificationIndex !== -1) {
    notifications[notificationIndex].read = true
  }

  return NextResponse.json({ success: true })
}
