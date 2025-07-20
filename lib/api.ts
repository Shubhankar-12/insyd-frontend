const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const request = async (path: string, options?: RequestInit) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// 🧑 User APIs
export const createUser = (data: {
  username: string;
  fullName: string;
  email: string;
}) =>
  request("/user/create", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getAllUsers = () => request("/user/list");

export const followUser = (data: { followerId: string; followeeId: string }) =>
  request("/user/follow", {
    method: "POST",
    body: JSON.stringify(data),
  });

// 📝 Post APIs
export const createPost = (data: {
  authorId: string;
  title: string;
  body?: string;
}) =>
  request("/post/create", {
    method: "GET", // seems like GET but usually should be POST
    body: JSON.stringify(data),
  });

export const getAllPosts = () => request("/post/list");

export const likePost = (data: { userId: string; postId: string }) =>
  request("/post/like", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const commentOnPost = (data: {
  userId: string;
  postId: string;
  content: string;
}) =>
  request("/post/comment", {
    method: "POST",
    body: JSON.stringify(data),
  });

// 🔔 Notification APIs
export const getUserNotifications = (userId: string) =>
  request(`/notification/list?userId=${userId}`);

export const markNotificationsAsRead = (data: {
  userId: string;
  notificationIds: string[];
}) =>
  request("/notification/mark", {
    method: "POST",
    body: JSON.stringify(data),
  });
