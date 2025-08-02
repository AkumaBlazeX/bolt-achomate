export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio: string;
  profilePicture: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userProfilePicture: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  userProfilePicture: string;
  content: string;
  timestamp: string;
}