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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
          <button className="text-2xl">🔍</button>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-6 px-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Feed Content */}
      <main className="p-4 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden p-0">
            {/* Creator Info */}
            <div className="px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => navigate(`/profile/${post.creator.username}`)}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                  {post.creator.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{post.creator.username}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="text-xl">⋯</span>
              </button>
            </div>

            {/* Content Image */}
            <div
              className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => alert('View full image')}
            >
              <div className="text-center">
                <span className="text-8xl">{post.image}</span>
                <p className="text-sm text-gray-500 mt-2">AI Generated Content</p>
              </div>
            </div>

            {/* Metadata and Actions */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-1 group"
                  >
                    <span className={`text-2xl transition-transform ${post.isLiked ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {post.isLiked ? '❤️' : '🤍'}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
                    <span className="text-sm font-medium text-gray-900">{post.comments}</span>
                  </button>
                  <button className="text-2xl hover:scale-110 transition-transform">🔗</button>
                </div>
                <button className="text-2xl hover:scale-110 transition-transform">🔖</button>
              </div>

              {/* Tool Used */}
              <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-xs font-medium text-gray-600">✨ {post.tool}</span>
              </div>
            </div>
          </Card>
        ))}

        {/* Load More */}
        <div className="py-8 text-center">
          <button className="px-6 py-3 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300 transition-all">
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
