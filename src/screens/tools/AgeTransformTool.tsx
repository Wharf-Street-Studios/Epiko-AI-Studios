import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';

const ageStyles = [
  { id: 'child', name: 'Child (5 years)', emoji: '👶' },
  { id: 'teen', name: 'Teen (15 years)', emoji: '🧒' },
  { id: 'young', name: 'Young Adult (25)', emoji: '👨' },
  { id: 'middle', name: 'Middle Age (50)', emoji: '👨‍🦳' },
  { id: 'senior', name: 'Senior (70)', emoji: '👴' },
  { id: 'elder', name: 'Elder (90)', emoji: '🧓' },
];

const AgeTransformTool: React.FC = () => {
  const config = {
    name: 'Age Transform',
    icon: '⏳',
    toolId: 'age-transform',
    description: 'See yourself at different ages',
    instructions: 'Upload Your Photo',
    uploadCount: 1,
    styles: ageStyles,
  };

  return <AIToolTemplate config={config} />;
};

export default AgeTransformTool;
