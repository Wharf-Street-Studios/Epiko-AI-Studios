import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, BottomNavigation } from '../../components/ui';

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
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'grid' | 'liked'>('grid');
  const [showSettings, setShowSettings] = useState(false);

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      signOut();
      navigate('/');
    }
  };

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
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Settings Dropdown */}
      {showSettings && (
        <div className="bg-white border-b-2 border-gray-200 px-6 py-4">
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="mr-2">✏️</span>
              Edit Profile
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="mr-2">🔔</span>
              Notifications
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="mr-2">🔒</span>
              Privacy Settings
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
            >
              <span className="mr-2">🚪</span>
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Avatar and Info */}
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl border-4 border-gray-300">
              {user.avatar || '👤'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.username}</h2>
              <p className="text-sm text-gray-600 mb-2">{user.fullName}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <p className="font-bold text-gray-900">{mockUserCreations.length}</p>
                  <p className="text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">1.2K</p>
                  <p className="text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">345</p>
                  <p className="text-gray-500">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            AI content creator ✨ | Exploring the creative possibilities
          </p>
        </div>

        {/* Edit Profile Button */}
        <Button variant="outline" size="medium" fullWidth>
          Edit Profile
        </Button>
      </div>

      {/* Account Stats */}
      <div className="px-6 py-4 bg-gray-50 border-y-2 border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-500">Generations Today</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">257</p>
            <p className="text-xs text-gray-500">Total Likes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">Free</p>
            <p className="text-xs text-gray-500">Current Plan</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('grid')}
            className={`flex-1 py-3 text-center font-medium transition-all ${
              activeTab === 'grid'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="mr-2">🖼️</span>
            My Creations
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-3 text-center font-medium transition-all ${
              activeTab === 'liked'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="mr-2">❤️</span>
            Liked
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-2">
        {activeTab === 'grid' && (
          <>
            {mockUserCreations.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {mockUserCreations.map((creation) => (
                  <button
                    key={creation.id}
                    onClick={() => alert('View/Edit creation')}
                    className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center relative hover:opacity-80 transition-opacity"
                  >
                    <span className="text-5xl">{creation.emoji}</span>
                    <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs">
                      <span>❤️</span>
                      <span>{creation.likes}</span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs">
                        ⋯
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <span className="text-6xl block mb-4">✨</span>
                <p className="text-gray-500 mb-4">No creations yet</p>
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
              <div className="grid grid-cols-3 gap-2">
                {mockLikedContent.map((content) => (
                  <button
                    key={content.id}
                    onClick={() => alert('View content')}
                    className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <span className="text-5xl">{content.emoji}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <span className="text-6xl block mb-4">💕</span>
                <p className="text-gray-500">No liked content yet</p>
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
