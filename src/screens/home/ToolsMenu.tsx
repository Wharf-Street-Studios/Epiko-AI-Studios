import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../../context/TokenContext';
import { Card, BottomNavigation } from '../../components/ui';

const allTools = [
  {
    id: 'face-swap',
    name: 'Face Swap',
    icon: '🎭',
    description: 'Replace faces in template images',
    cost: 10,
    path: '/tools/face-swap',
    popular: true,
  },
  {
    id: 'ai-avatar',
    name: 'AI Avatar',
    icon: '👤',
    description: 'Create stylized portrait avatars',
    cost: 10,
    path: '/tools/ai-avatar',
    popular: true,
  },
  {
    id: 'couple-photo',
    name: 'Couple Photo',
    icon: '💑',
    description: 'Romantic scenes for couples',
    cost: 15,
    path: '/tools/couple-photo',
    popular: true,
  },
  {
    id: 'baby-predictor',
    name: 'Baby Predictor',
    icon: '👶',
    description: 'Visualize your future baby',
    cost: 15,
    path: '/tools/baby-predictor',
    popular: false,
  },
  {
    id: 'gender-swap',
    name: 'Gender Swap',
    icon: '⚧️',
    description: 'Transform gender appearance',
    cost: 10,
    path: '/tools/gender-swap',
    popular: false,
  },
  {
    id: 'age-transform',
    name: 'Age Transform',
    icon: '⏳',
    description: 'See yourself younger or older',
    cost: 10,
    path: '/tools/age-transform',
    popular: false,
  },
  {
    id: 'enhance',
    name: 'Enhance',
    icon: '✨',
    description: 'Improve photo quality to HD',
    cost: 15,
    path: '/tools/enhance',
    popular: false,
  },
];

const ToolsMenu: React.FC = () => {
  const navigate = useNavigate();
  const { balance } = useTokens();

  const popularTools = allTools.filter(tool => tool.popular);
  const otherTools = allTools.filter(tool => !tool.popular);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-5 sticky top-0 z-10 shadow-soft">
        <div className="flex items-center justify-between animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create</h1>
          <div className="flex items-center space-x-2.5 bg-gradient-to-br from-amber-50 to-amber-100 px-5 py-2.5 rounded-full shadow-soft border border-amber-200">
            <span className="text-xl">💎</span>
            <span className="font-bold text-gray-900">{balance}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 space-y-8">
        {/* Popular Tools */}
        <section className="animate-slide-up">
          <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">🔥</span> Popular Tools
            </h2>
            <span className="text-sm text-gray-700 font-semibold bg-gray-200 px-4 py-2 rounded-full border border-gray-300">{popularTools.length} tools</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {popularTools.map((tool, index) => (
              <Card
                key={tool.id}
                onClick={() => navigate(tool.path)}
                hover
                className="p-6 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-5 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center text-3xl shadow-medium group-hover:shadow-strong transition-all duration-300 transform group-hover:scale-110 border-2 border-blue-200 group-hover:border-blue-300">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {tool.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-gray-500">Cost:</span>
                        <div className="flex items-center space-x-1.5 bg-gradient-to-br from-amber-50 to-amber-100 px-3 py-1.5 rounded-full border border-amber-200 shadow-soft">
                          <span className="text-sm">💎</span>
                          <span className="text-sm font-bold text-gray-900">{tool.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 group-hover:text-blue-500 text-3xl transition-all duration-300 transform group-hover:translate-x-1">›</button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Other Tools */}
        <section className="animate-slide-up pt-4 border-t-4 border-gray-200" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              All Tools
            </h2>
            <span className="text-sm text-gray-700 font-semibold bg-gray-200 px-4 py-2 rounded-full border border-gray-300">{otherTools.length} tools</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {otherTools.map((tool, index) => (
              <Card
                key={tool.id}
                onClick={() => navigate(tool.path)}
                hover
                className="aspect-square flex flex-col items-center justify-center space-y-3.5 p-5 group"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-300 transform group-hover:scale-110 border-2 border-blue-200 group-hover:border-blue-300">
                  <span className="text-4xl">{tool.icon}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-1.5 bg-gradient-to-br from-amber-50 to-amber-100 px-3 py-1.5 rounded-full border border-amber-200 shadow-soft">
                    <span className="text-xs">💎</span>
                    <span className="text-xs font-bold text-gray-900">{tool.cost}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Get More Tokens CTA */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 border-2 border-blue-200 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Need more tokens?</h3>
              <p className="text-sm text-gray-600">Get more tokens to unlock unlimited creativity</p>
            </div>
            <button
              onClick={() => navigate('/wallet')}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-medium hover:shadow-strong transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Get Tokens
            </button>
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ToolsMenu;
