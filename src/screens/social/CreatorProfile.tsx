import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from '../../components/ui';

interface CreatorData {
  username: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
  isFollowing: boolean;
}

const mockCreatorData: CreatorData = {
  username: 'sarah_creates',
  avatar: '👩‍🎨',
  bio: 'AI Artist & Content Creator 🎨\nLove creating romantic & dreamy content ✨\nCheck out my latest creations 👇',
  posts: 124,
  followers: 15600,
  following: 234,
  isFollowing: false,
};

const mockCreations = [
  { id: 1, emoji: '🎨', likes: 234 },
  { id: 2, emoji: '🌅', likes: 567 },
  { id: 3, emoji: '✨', likes: 890 },
  { id: 4, emoji: '🎭', likes: 432 },
  { id: 5, emoji: '💕', likes: 678 },
  { id: 6, emoji: '🌃', likes: 345 },
];

const CreatorProfile: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [creator, setCreator] = useState<CreatorData>(mockCreatorData);
  const [activeTab, setActiveTab] = useState<'grid' | 'liked'>('grid');

  const handleFollowToggle = () => {
    setCreator({
      ...creator,
      isFollowing: !creator.isFollowing,
      followers: creator.isFollowing ? creator.followers - 1 : creator.followers + 1,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b-2 border-gray-200 px-6 py-5 sticky top-0 z-10 shadow-soft">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{username}</h1>
        </div>
      </header>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Avatar and Stats */}
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-4xl shadow-medium border-4 border-white">
              {creator.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{creator.username}</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <p className="font-bold text-gray-900">{creator.posts}</p>
                  <p className="text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{creator.followers.toLocaleString()}</p>
                  <p className="text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{creator.following}</p>
                  <p className="text-gray-500">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-gray-900 whitespace-pre-line">{creator.bio}</p>
        </div>

        {/* Follow Button */}
        <Button
          variant={creator.isFollowing ? 'outline' : 'primary'}
          size="medium"
          fullWidth
          onClick={handleFollowToggle}
        >
          {creator.isFollowing ? '✓ Following' : '+ Follow'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-gray-200 bg-white/80 backdrop-blur-sm sticky top-20 z-10 shadow-soft">
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
            Grid
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
          <div className="grid grid-cols-3 gap-3">
            {mockCreations.map((creation, index) => (
              <button
                key={creation.id}
                onClick={() => navigate(`/reel/${creation.id}`)}
                className="aspect-square bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 rounded-2xl flex flex-col items-center justify-center relative hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-medium border border-gray-100 group animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{creation.emoji}</span>
                <div className="absolute bottom-2 left-2 flex items-center space-x-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-white text-xs font-semibold shadow-medium">
                  <span>❤️</span>
                  <span>{creation.likes}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="py-16 text-center animate-fade-in">
            <span className="text-8xl block mb-6">💕</span>
            <p className="text-gray-600 text-lg font-medium">Liked content will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorProfile;
