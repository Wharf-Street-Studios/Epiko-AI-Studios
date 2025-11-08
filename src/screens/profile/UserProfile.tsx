import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTokens } from '../../context/TokenContext';
import { Button, BottomNavigation } from '../../components/ui';
import { Settings } from 'lucide-react';

const mockUserCreations = [
  { id: 1, emoji: '🎨', likes: 45, tool: 'Face Swap' },
  { id: 2, emoji: '🌅', likes: 89, tool: 'Scene Swap' },
  { id: 3, emoji: '✨', likes: 123, tool: 'Colorize' },
];

const mockLikedContent = [
  { id: 1, emoji: '💕', creator: 'sarah_creates' },
  { id: 2, emoji: '🎭', creator: 'john_ai' },
];

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'grid' | 'liked'>('grid');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 pb-20">
        <div className="text-center mb-8">
          <span className="text-8xl block mb-6">👤</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Sign In Required</h2>
          <p className="text-gray-600 mb-8">
            Please sign in to view your profile and creations
          </p>
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-5 sticky top-0 z-10 shadow-soft">
        <div className="flex items-center justify-between animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile</h1>
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Settings className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Profile Info */}
      <div className="p-6 animate-slide-up">
        <div className="flex items-start justify-between mb-5">
          {/* Avatar and Info */}
          <div className="flex items-start space-x-4">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-5xl shadow-medium border-4 border-white">
              {user.avatar || '👤'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1.5">{user.username}</h2>
              <p className="text-sm text-gray-600 mb-3 font-medium">{user.fullName}</p>
              <div className="flex items-center space-x-5 text-sm">
                <button className="text-center group">
                  <p className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{mockUserCreations.length}</p>
                  <p className="text-gray-500 text-xs">Posts</p>
                </button>
                <button className="text-center group">
                  <p className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">1.2K</p>
                  <p className="text-gray-500 text-xs">Followers</p>
                </button>
                <button className="text-center group">
                  <p className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">345</p>
                  <p className="text-gray-500 text-xs">Following</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-5">
          <p className="text-gray-700 text-sm leading-relaxed">
            AI content creator ✨ | Exploring the creative possibilities
          </p>
        </div>

        {/* Edit Profile Button */}
        <Button variant="outline" size="medium" fullWidth>
          Edit Profile
        </Button>
      </div>

      {/* Account Stats */}
      <div className="mx-6 mb-6 p-5 bg-gradient-to-br from-primary-50 via-accent-50 to-amber-50 rounded-2xl shadow-medium border-2 border-primary-200 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="group cursor-pointer">
            <p className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">5</p>
            <p className="text-xs text-gray-600 font-medium">Generations Today</p>
          </div>
          <div className="group cursor-pointer">
            <p className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-accent-600 transition-colors">257</p>
            <p className="text-xs text-gray-600 font-medium">Total Likes</p>
          </div>
          <div className="group cursor-pointer">
            <p className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">Free</p>
            <p className="text-xs text-gray-600 font-medium">Current Plan</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-20 z-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex">
          <button
            onClick={() => setActiveTab('grid')}
            className={`flex-1 py-4 text-center font-semibold transition-all duration-300 relative ${
              activeTab === 'grid'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2 text-lg">🖼️</span>
            My Creations
            {activeTab === 'grid' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-4 text-center font-semibold transition-all duration-300 relative ${
              activeTab === 'liked'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2 text-lg">❤️</span>
            Liked
            {activeTab === 'liked' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-3">
        {activeTab === 'grid' && (
          <>
            {mockUserCreations.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {mockUserCreations.map((creation, index) => (
                  <button
                    key={creation.id}
                    onClick={() => alert('View/Edit creation')}
                    className="aspect-square bg-gradient-to-br from-primary-50 via-accent-50 to-amber-50 rounded-2xl flex flex-col items-center justify-center relative hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-medium border border-gray-100 group animate-scale-in"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{creation.emoji}</span>
                    <div className="absolute bottom-2 left-2 flex items-center space-x-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-white text-xs font-semibold shadow-medium">
                      <span>❤️</span>
                      <span>{creation.likes}</span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-sm hover:bg-white transition-all shadow-soft opacity-0 group-hover:opacity-100">
                        ⋯
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center animate-fade-in">
                <span className="text-7xl block mb-6">✨</span>
                <p className="text-gray-600 mb-6 text-lg font-medium">No creations yet</p>
                <Button variant="primary" size="medium" onClick={() => navigate('/face-swap')}>
                  Create Your First
                </Button>
              </div>
            )}
          </>
        )}

        {activeTab === 'liked' && (
          <>
            {mockLikedContent.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {mockLikedContent.map((content, index) => (
                  <button
                    key={content.id}
                    onClick={() => alert('View content')}
                    className="aspect-square bg-gradient-to-br from-primary-50 via-accent-50 to-amber-50 rounded-2xl flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-medium border border-gray-100 group animate-scale-in"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{content.emoji}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center animate-fade-in">
                <span className="text-7xl block mb-6">💕</span>
                <p className="text-gray-600 text-lg font-medium">No liked content yet</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default UserProfile;
