# Insyd - Real-Time Notification System POC

A Proof of Concept for a real-time notification system built for Insyd, a social media platform for architects.

## 🎯 Overview

This POC demonstrates core real-time notification functionality including user following, post creation, and instant notification delivery. Built with Next.js and simulated backend services to showcase the complete notification flow.

## ✨ Features

### User Management

- Create new architect users with specialties
- View all registered users
- Follow/unfollow system with instant notifications

### Real-Time Notifications

- **Follow Notifications**: Get notified when someone follows you
- **Post Notifications**: Followers receive notifications for new posts
- **Real-Time Updates**: Instant notification delivery (simulated WebSocket)
- **Read Status**: Mark individual or all notifications as read
- **Notification Feed**: Chronological list with timestamps

### Content Creation

- Create posts with title and content
- Automatic notifications to all followers
- Post metadata tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 How to Use

### Demo Flow

1. **Start at Home** - Navigate to different sections
2. **Users Page** - Create users and follow others to trigger notifications
3. **Notifications Page** - View real-time notification feed
4. **Create Post** - Share content and notify followers
5. **Switch Users** - Experience different user perspectives

### Key Interactions

- **Follow Users**: Click "Follow" on any user card
- **Create Posts**: Fill out the post form and submit
- **Check Notifications**: Real-time updates appear instantly
- **Mark as Read**: Click checkmark or "Mark all as read"

## 🏗️ Architecture

### Frontend

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components

### Simulated Backend

- **API Routes** - Next.js API endpoints
- **In-Memory Storage** - Simulated database operations
- **Custom Events** - Real-time notification simulation
- **RESTful Design** - Standard HTTP methods

### Real Implementation Would Use

- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Queue**: Redis + BullMQ for job processing
- **Real-Time**: Socket.IO for WebSocket connections
- **Deployment**: Render/Vercel

## 📂 Project Structure

```
app/
├── page.tsx # Home dashboard
├── users/page.tsx # User management
├── notifications/page.tsx # Notification feed
├── create-post/page.tsx # Post creation
├── components/ # Shared components
components/ui/ # UI components
README.md
```

## 🔧 API Endpoints

### Users

- `GET /api/users` - Fetch all users
- `POST /api/users` - Create new user

### Notifications

- `GET /api/notifications?userId=X` - Get user notifications
- `POST /api/notifications` - Create notification
- `PATCH /api/notifications/[id]/read` - Mark as read
- `PATCH /api/notifications/mark-all-read` - Mark all as read

### Posts

- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create new post

## 🎨 UI Features

### Simple & Functional

- Clean card-based layout
- Responsive design with Tailwind CSS
- Real-time status indicators
- Unread notification badges
- User switching for demo purposes

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

## 🚫 Intentionally Excluded

As per POC requirements, the following are **not implemented**:

- Authentication/login system
- Advanced UI/UX design
- Caching or pagination
- Email/mobile push notifications
- Profile images or media uploads
- Performance optimizations
- Production deployment setup

## 🔮 Next Steps

To convert this POC into a production system:

1. **Real Backend**: Implement Node.js + Express server
2. **Database**: Set up MongoDB with proper schemas
3. **Queue System**: Add Redis + BullMQ for job processing
4. **WebSocket**: Implement Socket.IO for real-time connections
5. **Authentication**: Add user login/registration
6. **Deployment**: Configure for production hosting
7. **Testing**: Add unit and integration tests
8. **Monitoring**: Implement logging and error tracking

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Components**: shadcn/ui, Lucide React icons
- **Simulated**: In-memory storage, custom events
- **Target**: Node.js, Express, MongoDB, Redis, Socket.IO

## 📄 License

This is a Proof of Concept project for demonstration purposes.
