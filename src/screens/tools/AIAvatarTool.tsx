import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';

const avatarStyles = [
  { id: 'realistic', name: 'Realistic Portrait', emoji: '📸' },
  { id: 'cartoon', name: 'Cartoon', emoji: '🎨' },
  { id: 'superhero', name: 'Superhero', emoji: '🦸' },
  { id: 'historical', name: 'Historical', emoji: '👑' },
  { id: 'cultural', name: 'Cultural', emoji: '🎭' },
  { id: 'seasonal', name: 'Seasonal', emoji: '🎄' },
];

const AIAvatarTool: React.FC = () => {
  const config = {
    name: 'AI Avatar',
    icon: '👤',
    toolId: 'ai-avatar',
    description: 'Transform your photo into a stylized avatar',
    instructions: 'Upload Your Photo',
    uploadCount: 1,
    styles: avatarStyles,
  };

  return <AIToolTemplate config={config} />;
};

export default AIAvatarTool;
