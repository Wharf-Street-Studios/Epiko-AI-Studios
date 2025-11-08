import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, BottomNavigation } from '../../components/ui';

const trendingHashtags = ['#AIArt', '#FaceSwap', '#CoupleGoals', '#AIAvatar', '#BabyPrediction', '#GlowUp'];

const categories = ['All', 'Face Swap', 'AI Avatar', 'Couples', 'Baby Predictor', 'Transform'];

const mockSearchResults = [
  { id: 1, emoji: '🎨', creator: 'sarah_creates', likes: 234 },
  { id: 2, emoji: '🌅', creator: 'john_ai', likes: 567 },
  { id: 3, emoji: '✨', creator: 'creative_mind', likes: 890 },
  { id: 4, emoji: '🎭', creator: 'art_lover', likes: 432 },
  { id: 5, emoji: '💕', creator: 'couple_goals', likes: 678 },
  { id: 6, emoji: '👶', creator: 'baby_magic', likes: 345 },
];

const SearchExplore: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'most-liked'>('trending');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b-2 border-gray-200 px-6 py-5 sticky top-0 z-10 shadow-soft">
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <span className="text-xl">←</span>
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search content, creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3.5 pl-12 border-2 border-gray-400 rounded-xl focus:outline-none focus:border-blue-600 transition-all duration-300 shadow-soft text-gray-900 font-medium"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
        </div>

        {/* Trending Hashtags */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          {trendingHashtags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap border-2 border-gray-300 shadow-soft"
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm border-b-2 border-gray-200 px-6 py-4 shadow-soft">
        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto mb-3 scrollbar-hide -mx-6 px-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border-2 border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 font-semibold">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border-2 border-gray-400 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-600 transition-all shadow-soft bg-white"
          >
            <option value="trending">Trending</option>
            <option value="recent">Recent</option>
            <option value="most-liked">Most Liked</option>
          </select>
        </div>
      </div>

      {/* Search Results */}
      <main className="p-5 space-y-4">
        {searchQuery ? (
          <div>
            <p className="text-sm text-gray-600 font-semibold mb-5">
              Showing results for "<span className="text-blue-600">{searchQuery}</span>"
            </p>
            <div className="grid grid-cols-2 gap-4">
              {mockSearchResults.map((result, index) => (
                <Card
                  key={result.id}
                  onClick={() => navigate(`/reel/${result.id}`)}
                  hover
                  className="aspect-square p-0 overflow-hidden relative animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 flex items-center justify-center">
                    <span className="text-7xl">{result.emoji}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span className="font-semibold">@{result.creator}</span>
                      <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span>❤️</span>
                        <span className="font-bold">{result.likes}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <span className="text-8xl block mb-6">🔍</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Discover Content</h3>
            <p className="text-gray-600 text-lg">Search for creators, content, or explore trending hashtags</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default SearchExplore;
