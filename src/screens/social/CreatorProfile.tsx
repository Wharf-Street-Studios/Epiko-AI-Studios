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
    <div className="min-h-screen bg-white pb-6">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-2xl mr-4">
            ←
          </button>
          <h1 className="text-xl font-bold text-gray-900">{username}</h1>
        </div>
      </header>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Avatar and Stats */}
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl border-4 border-gray-300">
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
            Grid
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
          <div className="grid grid-cols-3 gap-2">
            {mockCreations.map((creation) => (
              <button
                key={creation.id}
                onClick={() => alert('View full creation')}
                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center relative hover:opacity-80 transition-opacity"
              >
                <span className="text-5xl">{creation.emoji}</span>
                <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs">
                  <span>❤️</span>
                  <span>{creation.likes}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="py-12 text-center">
            <span className="text-6xl block mb-4">💕</span>
            <p className="text-gray-500">Liked content will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorProfile;
