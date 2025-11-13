import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTokens } from '../../context/TokenContext';
import { Card, Button, BottomNavigation } from '../../components/ui';
import { Search, Gem, Bell, User, TrendingUp, Heart, ArrowRight } from 'lucide-react';

const aiTools = [
  { id: 'face-swap', name: 'Face Swap', icon: '🎭', path: '/tools/face-swap', popular: true },
  { id: 'ai-avatar', name: 'AI Avatar', icon: '👤', path: '/tools/ai-avatar', popular: true },
  { id: 'couple-photo', name: 'Couple Photo', icon: '💑', path: '/tools/couple-photo', popular: true },
  { id: 'baby-predictor', name: 'Baby Predictor', icon: '👶', path: '/tools/baby-predictor', popular: false },
  { id: 'gender-swap', name: 'Gender Swap', icon: '⚧️', path: '/tools/gender-swap', popular: false },
  { id: 'age-transform', name: 'Age Transform', icon: '⏳', path: '/tools/age-transform', popular: false },
  { id: 'enhance', name: 'Enhance', icon: '✨', path: '/tools/enhance', popular: false },
];

const categories = [
  { id: 'romantic', name: 'Romantic Vibes', image: '💕' },
  { id: 'trending', name: 'Trending Now', image: '🔥' },
];

const topCreators = [
  { username: 'sarah_creates', avatar: '👩‍🎨', posts: 124 },
  { username: 'john_ai', avatar: '👨‍💼', posts: 89 },
  { username: 'creative_mind', avatar: '🧑‍🎨', posts: 156 },
  { username: 'art_lover', avatar: '👩', posts: 203 },
];

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { balance } = useTokens();

  const popularTools = aiTools.filter(tool => tool.popular);
  const otherTools = aiTools.filter(tool => !tool.popular);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Epiko AI Studios
          </h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/wallet')}
              className="flex items-center space-x-1 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-all"
            >
              <Gem className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-gray-900">{balance}</span>
            </button>
            <button onClick={() => navigate('/notifications')} className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </button>
            <button onClick={() => navigate('/profile')} className="p-1">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-700" />
              </div>
            </button>
          </div>
        </div>
        {/* Search Bar */}
        <button
          onClick={() => navigate('/search')}
          className="w-full bg-gray-100 rounded-lg px-4 py-2.5 flex items-center space-x-2 hover:bg-gray-200 transition-all"
        >
          <Search className="w-5 h-5 text-gray-500" />
          <span className="text-gray-500 text-sm">Search tools, creators...</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Popular Tools Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              Popular Tools
            </h2>
            <button
              onClick={() => navigate('/tools')}
              className="text-sm text-gray-600 font-medium hover:text-gray-900 flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {popularTools.map((tool) => (
              <Card
                key={tool.id}
                onClick={() => navigate(tool.path)}
                hover
                className="aspect-square flex flex-col items-center justify-center space-y-2"
              >
                <span className="text-4xl">{tool.icon}</span>
                <span className="font-semibold text-gray-900 text-xs text-center">{tool.name}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* More Tools Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            More Tools
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {otherTools.slice(0, 4).map((tool) => (
              <Card
                key={tool.id}
                onClick={() => navigate(tool.path)}
                hover
                className="aspect-square flex flex-col items-center justify-center space-y-1"
              >
                <span className="text-3xl">{tool.icon}</span>
                <span className="font-medium text-gray-900 text-[10px] text-center">{tool.name}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* Explore Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Explore
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                onClick={() => navigate('/discover')}
                hover
                className="aspect-[4/3] flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-gray-50 to-gray-100"
              >
                <span className="text-6xl">{category.image}</span>
                <span className="font-semibold text-gray-900">{category.name}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Creators Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Top Creators
            </h2>
            <button
              onClick={() => navigate('/discover')}
              className="text-sm text-gray-600 font-medium hover:text-gray-900"
            >
              View All →
            </button>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {topCreators.map((creator) => (
              <button
                key={creator.username}
                onClick={() => navigate(`/profile/${creator.username}`)}
                className="flex-shrink-0 text-center"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl mb-2 border-4 border-gray-300 hover:border-gray-900 transition-all">
                  {creator.avatar}
                </div>
                <p className="text-sm font-medium text-gray-900 max-w-[80px] truncate">
                  {creator.username}
                </p>
                <p className="text-xs text-gray-500">
                  {creator.posts} posts
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Discovery Feed CTA */}
        <section>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => navigate('/discover')}
            >
              <span className="flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Explore Discovery Feed
              </span>
            </Button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default HomeScreen;
