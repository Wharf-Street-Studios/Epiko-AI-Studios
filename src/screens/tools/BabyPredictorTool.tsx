import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';

const BabyPredictorTool: React.FC = () => {
  const config = {
    name: 'Baby Predictor',
    icon: '👶',
    toolId: 'baby-predictor',
    description: 'See what your future baby might look like',
    instructions: 'Upload 2 Parent Photos',
    uploadCount: 2,
  };

  return <AIToolTemplate config={config} />;
};

export default BabyPredictorTool;
