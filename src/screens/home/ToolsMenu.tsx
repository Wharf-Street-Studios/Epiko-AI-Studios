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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-2xl mr-4">
              ←
            </button>
            <h1 className="text-2xl font-bold text-gray-900">AI Tools</h1>
          </div>
          <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
            <span className="text-xl">💎</span>
            <span className="font-bold text-gray-900">{balance}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 space-y-8">
        {/* Popular Tools */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              🔥 Popular Tools
            </h2>
            <span className="text-sm text-gray-500">{popularTools.length} tools</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {popularTools.map((tool) => (
              <Card
                key={tool.id}
                onClick={() => navigate(tool.path)}
                hover
                className="p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-500">Cost:</span>
                        <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded">
                          <span className="text-sm">💎</span>
                          <span className="text-sm font-bold text-gray-900">{tool.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 text-2xl">›</button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Other Tools */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              All Tools
            </h2>
            <span className="text-sm text-gray-500">{otherTools.length} tools</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {otherTools.map((tool) => (
              <Card
                key={tool.id}
                onClick={() => navigate(tool.path)}
                hover
                className="aspect-square flex flex-col items-center justify-center space-y-3 p-4"
              >
                <span className="text-5xl">{tool.icon}</span>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {tool.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-xs">💎</span>
                    <span className="text-xs font-bold text-gray-900">{tool.cost}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Get More Tokens CTA */}
        <Card className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Need more tokens?</h3>
              <p className="text-sm text-gray-600">Get more tokens to unlock unlimited creativity</p>
            </div>
            <button
              onClick={() => navigate('/wallet')}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all"
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
