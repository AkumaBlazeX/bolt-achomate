import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MessageCircle, Heart, Share2, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const Landing: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const success = await login(email, password);
        if (success) {
          navigate('/feed');
        } else {
          setError('Invalid credentials. Please try again.');
        }
      } else {
        const success = await signup({
          email,
          username: username || email.split('@')[0],
          fullName,
          bio: '',
          profilePicture: ''
        });
        if (success) {
          navigate('/feed');
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Hero */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
          <div className="max-w-lg text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div className="relative floating-animation">
                <Sparkles className="h-12 w-12 text-white glow mr-3" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white text-glow">
                EchoMateLite
              </h1>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 text-glow">
              Connect with friends and share your story
            </h2>
            
            <p className="text-xl text-white/80 mb-8">
              Join our lightweight social platform where every voice matters. Share posts, connect with friends, and discover amazing content.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 floating-animation">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm font-medium text-white/90">Connect</p>
              </div>
              <div className="text-center">
                <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 floating-animation" style={{animationDelay: '1s'}}>
                  <Share2 className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm font-medium text-white/90">Share</p>
              </div>
              <div className="text-center">
                <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 floating-animation" style={{animationDelay: '2s'}}>
                  <Users className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm font-medium text-white/90">Discover</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Auth Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="glass rounded-2xl p-8 hover-lift">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome back!' : 'Join EchoMateLite'}
                </h3>
                <p className="text-white/70">
                  {isLogin ? 'Sign in to your account' : 'Create your account today'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                    <Input
                      label="Full Name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      icon={<User className="h-5 w-5 text-white/50" />}
                      required
                      placeholder="Enter your full name"
                    />
                    <Input
                      label="Username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      icon={<User className="h-5 w-5 text-white/50" />}
                      placeholder="Enter your username (optional)"
                    />
                  </>
                )}

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-5 w-5 text-white/50" />}
                  required
                  placeholder="Enter your email"
                />

                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-5 w-5 text-white/50" />}
                  required
                  placeholder="Enter your password"
                />

                {error && (
                  <div className="p-4 glass-dark rounded-xl border border-red-400/30">
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  loading={isLoading}
                  className="w-full text-lg py-3"
                  size="lg"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/70">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                    }}
                    className="ml-2 text-white hover:text-purple-300 font-medium smooth-transition"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;