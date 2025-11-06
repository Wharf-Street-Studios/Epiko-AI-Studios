import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';

const coupleTemplates = [
  { id: 1, name: 'Romantic Sunset', emoji: '🌅', category: 'Romantic' },
  { id: 2, name: 'Beach Paradise', emoji: '🏖️', category: 'Travel' },
  { id: 3, name: 'Mountain Adventure', emoji: '⛰️', category: 'Adventure' },
  { id: 4, name: 'City Lights', emoji: '🌃', category: 'Urban' },
  { id: 5, name: 'Fairy Tale', emoji: '🏰', category: 'Fantasy' },
  { id: 6, name: 'Wedding Day', emoji: '💒', category: 'Special' },
];

const CouplePhotoTool: React.FC = () => {
  const config = {
    name: 'Couple Photo',
    icon: '💑',
    toolId: 'couple-photo',
    description: 'Create romantic scenes with your partner',
    instructions: 'Upload 2 Photos',
    uploadCount: 2,
    templates: coupleTemplates,
  };

  return <AIToolTemplate config={config} />;
};

export default CouplePhotoTool;
