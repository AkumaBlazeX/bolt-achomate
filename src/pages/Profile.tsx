import React, { useState, useRef } from 'react';
import { Edit3, Camera, Heart, MessageCircle, Share2, MoreHorizontal, X, Upload, Image } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Button from '../components/UI/Button';
import Navbar from '../components/Layout/Navbar';

interface UserData {
  username: string;
  fullName: string;
  position: string;
  bio: string;
  location: string;
  joinDate: string;
  profilePicture: string;
  coverImage: string;
  backgroundBanner: string;
  stats: {
    posts: number;
    likes: number;
  };
}

interface EditFormData {
  fullName: string;
  position: string;
  bio: string;
  location: string;
  profilePicture: string;
  coverImage: string;
  backgroundBanner: string;
}

const Profile: React.FC = () => {
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const backgroundFileInputRef = useRef<HTMLInputElement>(null);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState<'profile' | 'cover' | 'background'>('profile');

  const [userData, setUserData] = useState<UserData>({
    username: 'john_doe',
    fullName: 'John Doe',
    position: 'Senior Software Engineer | Full Stack Developer | React Specialist',
    bio: 'Passionate developer with 5+ years of experience building modern web applications. Specialized in React, TypeScript, and cloud technologies. Always learning and sharing knowledge with the community.',
    location: 'San Francisco, CA',
    joinDate: 'March 2024',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    coverImage: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    backgroundBanner: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    stats: {
      posts: 42,
      likes: 1200
    }
  });

  const [editForm, setEditForm] = useState<EditFormData>({
    fullName: '',
    position: '',
    bio: '',
    location: '',
    profilePicture: '',
    coverImage: '',
    backgroundBanner: ''
  });

  // Optimized preset background options with smaller images
  const presetBackgrounds = [
    {
      id: 'gradient-purple',
      name: 'Purple Gradient',
      url: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      type: 'gradient'
    },
    {
      id: 'gradient-blue',
      name: 'Blue Ocean',
      url: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #a855f7 100%)',
      type: 'gradient'
    },
    {
      id: 'gradient-sunset',
      name: 'Sunset',
      url: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)',
      type: 'gradient'
    },
    {
      id: 'image-nature',
      name: 'Nature',
      url: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=150&fit=crop',
      type: 'image'
    },
    {
      id: 'image-city',
      name: 'City Lights',
      url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=150&fit=crop',
      type: 'image'
    },
    {
      id: 'image-tech',
      name: 'Tech',
      url: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=400&h=150&fit=crop',
      type: 'image'
    }
  ];

  const samplePosts = [
    {
      id: '1',
      content: 'Just launched a new feature in our React application! 🚀 The glass morphism design system is getting amazing feedback from users. Excited to share more updates soon.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likesCount: 24,
      commentsCount: 8,
      isLiked: false
    },
    {
      id: '2',
      content: 'Working on some exciting TypeScript projects this week. The type safety and developer experience improvements are incredible. What\'s your favorite TypeScript feature?',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      likesCount: 18,
      commentsCount: 5,
      isLiked: true
    },
    {
      id: '3',
      content: 'Attended an amazing tech conference today! Met so many inspiring developers and learned about the latest trends in web development. The future of the web looks bright! ✨',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      likesCount: 31,
      commentsCount: 12,
      isLiked: false
    }
  ];

  const handleLike = (postId: string) => {
    // Handle like functionality
  };

  const openEditModal = (type: 'profile' | 'cover' | 'background') => {
    setEditType(type);
    setEditForm({
      fullName: userData.fullName,
      position: userData.position,
      bio: userData.bio,
      location: userData.location,
      profilePicture: userData.profilePicture,
      coverImage: userData.coverImage,
      backgroundBanner: userData.backgroundBanner
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleSave = () => {
    setUserData(prev => ({
      ...prev,
      ...editForm
    }));
    closeEditModal();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover' | 'background') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setEditForm(prev => ({
          ...prev,
          [type === 'profile' ? 'profilePicture' : type === 'cover' ? 'coverImage' : 'backgroundBanner']: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = (type: 'profile' | 'cover' | 'background') => {
    if (type === 'profile') {
      profileFileInputRef.current?.click();
    } else if (type === 'cover') {
      coverFileInputRef.current?.click();
    } else {
      backgroundFileInputRef.current?.click();
    }
  };

  const handleInputChange = (field: keyof EditFormData, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const selectPresetBackground = (background: typeof presetBackgrounds[0]) => {
    setEditForm(prev => ({
      ...prev,
      backgroundBanner: background.url
    }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Cover Image Section */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <div className="absolute inset-0">
          {userData.backgroundBanner.startsWith('linear-gradient') ? (
            <div 
              className="w-full h-full"
              style={{ background: userData.backgroundBanner }}
            />
          ) : (
            <img
              src={userData.backgroundBanner}
              alt="Background"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
        {/* Edit Cover Button */}
        <button 
          onClick={() => openEditModal('cover')}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 glass-button rounded-full hover-lift"
        >
          <Camera className="h-4 w-4 text-white" />
        </button>
        {/* Edit Background Button */}
        <button 
          onClick={() => openEditModal('background')}
          className="absolute top-3 right-12 sm:top-4 sm:right-16 p-2 glass-button rounded-full hover-lift"
        >
          <Image className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8">
        {/* Profile Header Card */}
        <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 relative">
          {/* Edit Profile Button */}
          <button 
            onClick={() => openEditModal('profile')}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 glass-button rounded-full hover-lift"
          >
            <Edit3 className="h-4 w-4 text-white" />
          </button>

          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-4 sm:mb-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={userData.profilePicture}
                alt={userData.fullName}
                className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full object-cover ring-4 ring-white/20 glow"
                loading="lazy"
              />
              <button 
                onClick={() => openEditModal('profile')}
                className="absolute -bottom-1 -right-1 p-1.5 sm:p-2 glass-button rounded-full hover-lift"
              >
                <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </button>
            </div>

            {/* Name and Position */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 text-glow">
                {userData.fullName}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-2 font-medium">
                {userData.position}
              </p>
              <p className="text-xs sm:text-sm text-white/60">
                📍 {userData.location} • Joined {userData.joinDate}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6">
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{userData.stats.posts}</div>
              <div className="text-xs sm:text-sm text-white/70">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{userData.stats.likes}</div>
              <div className="text-xs sm:text-sm text-white/70">Likes</div>
            </div>
          </div>

          {/* Bio */}
          <div className="border-t border-white/10 pt-4 sm:pt-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2 sm:mb-3">About</h3>
            <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed">
              {userData.bio}
            </p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 text-glow">Posts</h2>
          
          {samplePosts.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {samplePosts.map((post) => (
                <div key={post.id} className="glass-dark rounded-xl p-3 sm:p-4 lg:p-6 hover-lift smooth-transition">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <img
                        src={userData.profilePicture}
                        alt={userData.fullName}
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-white/20"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="font-semibold text-white text-xs sm:text-sm lg:text-base">{userData.fullName}</h3>
                        <p className="text-xs text-white/60">
                          {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <button className="p-1 sm:p-1.5 hover:glass-button rounded-full smooth-transition">
                      <MoreHorizontal className="h-4 w-4 text-white/60" />
                    </button>
                  </div>
                  
                  {/* Post Content */}
                  <p className="text-xs sm:text-sm lg:text-base text-white/90 mb-3 sm:mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  
                  {/* Post Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-1 sm:space-x-1.5 smooth-transition hover:scale-110 ${
                          post.isLiked 
                            ? 'text-red-400 hover:text-red-300' 
                            : 'text-white/70 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs font-medium">{post.likesCount}</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 sm:space-x-1.5 text-white/70 hover:text-blue-400 smooth-transition hover:scale-110">
                        <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="text-xs font-medium">{post.commentsCount}</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 sm:space-x-1.5 text-white/70 hover:text-green-400 smooth-transition hover:scale-110">
                        <Share2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="text-xs font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="h-12 w-12 sm:h-16 sm:w-16 glass-dark rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white/50" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-2">No posts yet</h3>
              <p className="text-xs sm:text-sm lg:text-base text-white/70 mb-3 sm:mb-4">Start sharing your thoughts with the community!</p>
              <Button variant="primary" size="sm">
                Create Your First Post
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Edit {editType === 'profile' ? 'Profile' : editType === 'cover' ? 'Cover' : 'Background'}
              </h2>
              <button
                onClick={closeEditModal}
                className="p-2 hover:glass-button rounded-full smooth-transition"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Background Presets Section */}
              {editType === 'background' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Choose Background</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {presetBackgrounds.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => selectPresetBackground(bg)}
                        className="relative group rounded-xl overflow-hidden hover-lift smooth-transition"
                      >
                        {bg.type === 'gradient' ? (
                          <div 
                            className="h-20 w-full"
                            style={{ background: bg.url }}
                          />
                        ) : (
                          <img
                            src={bg.url}
                            alt={bg.name}
                            className="h-20 w-full object-cover"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{bg.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button
                      variant="secondary"
                      onClick={() => triggerFileUpload('background')}
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Custom Background
                    </Button>
                  </div>
                </div>
              )}

              {/* Image Upload Section */}
              {editType !== 'background' && (
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={editType === 'profile' ? editForm.profilePicture : editForm.coverImage}
                      alt={editType === 'profile' ? 'Profile' : 'Cover'}
                      className={`rounded-full object-cover ring-4 ring-white/20 glow ${
                        editType === 'profile' ? 'h-24 w-24 sm:h-32 sm:w-32' : 'h-32 w-full sm:h-48 rounded-xl'
                      }`}
                      loading="lazy"
                    />
                    <button
                      onClick={() => triggerFileUpload(editType)}
                      className="absolute bottom-2 right-2 p-2 glass-button rounded-full hover-lift"
                    >
                      <Upload className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              )}

              {/* Hidden File Inputs */}
              <input
                ref={profileFileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'profile')}
                className="hidden"
              />
              <input
                ref={coverFileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'cover')}
                className="hidden"
              />
              <input
                ref={backgroundFileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'background')}
                className="hidden"
              />

              {/* Form Fields */}
              {editType !== 'background' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 glass-dark rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Position/Title
                    </label>
                    <input
                      type="text"
                      value={editForm.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 glass-dark rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                      placeholder="Enter your position or title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 glass-dark rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                      placeholder="Enter your location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Bio/Description
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 glass-dark rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm sm:text-base"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={closeEditModal}
                  className="flex-1"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="flex-1"
                  size="sm"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;