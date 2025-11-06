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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-2xl">
            ←
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search content, creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
        </div>

        {/* Trending Hashtags */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {trendingHashtags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-3">
        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto mb-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900"
          >
            <option value="trending">Trending</option>
            <option value="recent">Recent</option>
            <option value="most-liked">Most Liked</option>
          </select>
        </div>
      </div>

      {/* Search Results */}
      <main className="p-4">
        {searchQuery ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Showing results for "{searchQuery}"
            </p>
            <div className="grid grid-cols-2 gap-3">
              {mockSearchResults.map((result) => (
                <Card
                  key={result.id}
                  onClick={() => navigate(`/reel/${result.id}`)}
                  hover
                  className="aspect-square p-0 overflow-hidden relative"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl">{result.emoji}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span className="font-medium">@{result.creator}</span>
                      <div className="flex items-center space-x-1">
                        <span>❤️</span>
                        <span>{result.likes}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Discover Content</h3>
            <p className="text-gray-600">Search for creators, content, or explore trending hashtags</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default SearchExplore;
