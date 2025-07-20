import { type NextRequest, NextResponse } from "next/server"

// Simulated user storage (in real app, this would be MongoDB)
const users: any[] = []

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const userData = await request.json()

  // Simulate MongoDB save
  users.push(userData)

  return NextResponse.json({ success: true, user: userData })
}
