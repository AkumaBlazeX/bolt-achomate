import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, X, Send, Sparkles } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/UI/Button';
import { useAuth } from '../context/AuthContext';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, addPost } = useAuth();
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add post to user's posts
    addPost({
      content,
      imageUrl: selectedImage || undefined
    });
    
    setIsLoading(false);
    navigate('/feed');
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-glow">Create Post</h1>
          <p className="text-white/70">Share what's on your mind</p>
        </div>

        <div className="glass rounded-2xl overflow-hidden hover-lift smooth-transition">
          {/* User Info */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <img
                src={user.profilePicture}
                alt={user.username}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20 glow"
              />
              <div>
                <h3 className="font-semibold text-white">{user.fullName}</h3>
                <p className="text-sm text-white/60">@{user.username}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Content Input */}
            <div className="p-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                rows={4}
                className="w-full text-lg placeholder-white/50 text-white bg-transparent border-none resize-none focus:outline-none"
                maxLength={280}
              />
              
              <div className="text-right text-sm text-white/60 mb-4">
                {content.length}/280
              </div>

              {/* Image Preview */}
              {selectedImage && (
                <div className="relative mb-4">
                  <img
                    src={selectedImage}
                    alt="Upload preview"
                    className="w-full rounded-xl max-h-96 object-cover hover-lift smooth-transition"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 glass-dark text-white p-2 rounded-full hover:scale-110 smooth-transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-white/70 hover:text-purple-400 cursor-pointer smooth-transition hover:scale-105">
                  <Image className="h-5 w-5" />
                  <span className="text-sm font-medium">Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <Button
                type="submit"
                disabled={!content.trim() || isLoading}
                loading={isLoading}
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 glass rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white">Tips for great posts:</h3>
          </div>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              Keep it authentic and engaging
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              Add images to make your post more visual
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              Ask questions to start conversations
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              Share your experiences and insights
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;