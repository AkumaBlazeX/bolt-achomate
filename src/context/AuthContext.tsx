import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'joinedDate' | 'followersCount' | 'followingCount'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
  userPosts: Post[];
  addPost: (post: Omit<Post, 'id' | 'userId' | 'username' | 'userProfilePicture' | 'timestamp'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('echomate_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load user posts
    const storedPosts = localStorage.getItem('echomate_user_posts');
    if (storedPosts) {
      setUserPosts(JSON.parse(storedPosts));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: '1',
        username: email.split('@')[0],
        email,
        fullName: 'John Doe',
        bio: 'Welcome to my EchoMateLite profile!',
        profilePicture: `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
        joinedDate: new Date().toISOString(),
        followersCount: 42,
        followingCount: 38
      };
      
      setUser(mockUser);
      localStorage.setItem('echomate_user', JSON.stringify(mockUser));
      
      // Load user posts for this user
      const storedPosts = localStorage.getItem(`echomate_posts_${mockUser.id}`);
      if (storedPosts) {
        setUserPosts(JSON.parse(storedPosts));
      }
      
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (userData: Omit<User, 'id' | 'joinedDate' | 'followersCount' | 'followingCount'>): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString(),
      followersCount: 0,
      followingCount: 0,
      profilePicture: userData.profilePicture || `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
    };
    
    setUser(newUser);
    localStorage.setItem('echomate_user', JSON.stringify(newUser));
    setUserPosts([]);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setUserPosts([]);
    localStorage.removeItem('echomate_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('echomate_user', JSON.stringify(updatedUser));
    }
  };

  const addPost = (postData: Omit<Post, 'id' | 'userId' | 'username' | 'userProfilePicture' | 'timestamp'>) => {
    if (user) {
      const newPost: Post = {
        ...postData,
        id: Date.now().toString(),
        userId: user.id,
        username: user.username,
        userProfilePicture: user.profilePicture,
        timestamp: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
        isLiked: false
      };
      
      const updatedPosts = [newPost, ...userPosts];
      setUserPosts(updatedPosts);
      localStorage.setItem(`echomate_posts_${user.id}`, JSON.stringify(updatedPosts));
    }
  };
  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    isLoading,
    userPosts,
    addPost
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};