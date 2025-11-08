import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, Card } from '../../components/ui';

interface Post {
  id: number;
  creator: {
    username: string;
    avatar: string;
  };
  image: string;
  tool: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: 1,
    creator: { username: 'sarah_creates', avatar: '👩‍🎨' },
    image: '🎨',
    tool: 'Face Swap',
    timestamp: '2 hours ago',
    likes: 234,
    comments: 12,
    isLiked: false,
  },
  {
    id: 2,
    creator: { username: 'john_ai', avatar: '👨‍💼' },
    image: '🌅',
    tool: 'Scene Swap',
    timestamp: '5 hours ago',
    likes: 567,
    comments: 34,
    isLiked: true,
  },
  {
    id: 3,
    creator: { username: 'creative_mind', avatar: '🧑‍🎨' },
    image: '✨',
    tool: 'Colorize',
    timestamp: '1 day ago',
    likes: 890,
    comments: 45,
    isLiked: false,
  },
  {
    id: 4,
    creator: { username: 'art_lover', avatar: '👩' },
    image: '🎭',
    tool: 'Face Swap',
    timestamp: '2 days ago',
    likes: 1234,
    comments: 89,
    isLiked: false,
  },
];

const filters = ['All', 'Following', 'Romantic Vibes', 'Trending', 'Face Swap', 'Scene Swap', 'Colorize'];

const DiscoveryFeed: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-5 sticky top-0 z-10 shadow-soft">
        <div className="flex items-center justify-between mb-4 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Feed</h1>
          <button
            onClick={() => navigate('/search')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <span className="text-xl">🔍</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border-2 border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Feed Content */}
      <main className="p-5 space-y-6">
        {posts.map((post, index) => (
          <Card key={post.id} className="overflow-hidden p-0 animate-slide-up border-2 border-gray-300" style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Creator Info */}
            <div className="px-5 py-4 flex items-center justify-between">
              <button
                onClick={() => navigate(`/profile/${post.creator.username}`)}
                className="flex items-center space-x-3 group"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-xl shadow-soft group-hover:shadow-medium transition-all duration-300 transform group-hover:scale-105">
                  {post.creator.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{post.creator.username}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-300 text-gray-400 hover:text-gray-600 active:scale-90">
                <span className="text-xl">⋯</span>
              </button>
            </div>

            {/* Content Image */}
            <div
              className="w-full aspect-square bg-gradient-to-br from-gray-50 via-primary-50 to-accent-50 flex items-center justify-center cursor-pointer relative overflow-hidden group"
              onClick={() => alert('View full image')}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-center relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-8xl drop-shadow-lg">{post.image}</span>
                <p className="text-sm text-gray-600 mt-3 font-medium">AI Generated Content</p>
              </div>
            </div>

            {/* Metadata and Actions */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-5">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 group"
                  >
                    <span className={`text-2xl transition-all duration-300 ${post.isLiked ? 'scale-110 animate-pulse' : 'group-hover:scale-110'}`}>
                      {post.isLiked ? '❤️' : '🤍'}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 group">
                    <span className="text-2xl group-hover:scale-110 transition-all duration-300">💬</span>
                    <span className="text-sm font-semibold text-gray-900">{post.comments}</span>
                  </button>
                  <button className="text-2xl hover:scale-110 transition-all duration-300 hover:rotate-12">🔗</button>
                </div>
                <button className="text-2xl hover:scale-110 transition-all duration-300 hover:-rotate-12">🔖</button>
              </div>

              {/* Tool Used */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200 shadow-soft">
                <span className="text-xs font-semibold text-gray-700">✨ {post.tool}</span>
              </div>
            </div>
          </Card>
        ))}

        {/* Load More */}
        <div className="py-8 text-center">
          <button className="px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-soft hover:shadow-medium border border-gray-200 transform hover:scale-105 active:scale-95">
            Load More
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default DiscoveryFeed;
