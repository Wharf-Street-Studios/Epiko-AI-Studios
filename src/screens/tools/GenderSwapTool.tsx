import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';

const GenderSwapTool: React.FC = () => {
  const config = {
    name: 'Gender Swap',
    icon: '⚧️',
    toolId: 'gender-swap',
    description: 'Transform your gender appearance with AI',
    instructions: 'Upload Your Photo',
    uploadCount: 1,
  };

  return <AIToolTemplate config={config} />;
};

export default GenderSwapTool;
