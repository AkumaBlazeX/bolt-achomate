import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '../types';
import Navbar from '../components/Layout/Navbar';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Mock posts data
    const mockPosts: Post[] = [
      {
        id: '1',
        userId: '2',
        username: 'sarah_dev',
        userProfilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        content: 'Just launched my new project! 🚀 Excited to share it with the community. Built with React and TypeScript, featuring a modern design and smooth animations.',
        imageUrl: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        likesCount: 24,
        commentsCount: 8,
        isLiked: false
      },
      {
        id: '2',
        userId: '3',
        username: 'mike_designer',
        userProfilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        content: 'Beautiful sunset today! Sometimes you just need to step back and appreciate the simple things in life. Nature has a way of putting everything into perspective.',
        imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        likesCount: 42,
        commentsCount: 12,
        isLiked: true
      },
      {
        id: '3',
        userId: '4',
        username: 'alex_explorer',
        userProfilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        content: 'Coffee and coding - the perfect combination for a productive morning! ☕️ Working on some exciting features for our upcoming release.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        likesCount: 18,
        commentsCount: 5,
        isLiked: false
      },
      {
        id: '4',
        userId: '5',
        username: 'emma_creative',
        userProfilePicture: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        content: 'Thrilled to announce that our team just won the hackathon! 🏆 Three days of intense coding, but totally worth it. Huge thanks to my amazing teammates!',
        imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        likesCount: 67,
        commentsCount: 23,
        isLiked: true
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1
          }
        : post
    ));
  };

  const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="glass rounded-2xl overflow-hidden hover-lift smooth-transition">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.userProfilePicture}
            alt={post.username}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20 glow"
          />
          <div>
            <h3 className="font-semibold text-white">{post.username}</h3>
            <p className="text-sm text-white/60">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
        <button className="p-2 hover:glass-button rounded-full smooth-transition">
          <MoreHorizontal className="h-5 w-5 text-white/60" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-white/90 leading-relaxed">{post.content}</p>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="px-4 pb-3">
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full rounded-xl object-cover max-h-96 hover-lift smooth-transition"
          />
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleLike(post.id)}
              className={`flex items-center space-x-2 smooth-transition hover:scale-110 ${
                post.isLiked 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-white/70 hover:text-red-400'
              }`}
            >
              <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likesCount}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-white/70 hover:text-blue-400 smooth-transition hover:scale-110">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{post.commentsCount}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-white/70 hover:text-green-400 smooth-transition hover:scale-110">
              <Share2 className="h-5 w-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-glow">Your Feed</h1>
          <p className="text-white/70">Stay connected with your community</p>
        </div>

        <div className="space-y-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-white/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No posts yet</h3>
            <p className="text-white/70">Start following people to see their posts in your feed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;