import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../../context/TokenContext';
import { Button, Card } from './index';

interface ToolConfig {
  name: string;
  icon: string;
  toolId: string;
  description: string;
  instructions: string;
  uploadCount: number; // How many images needed
  templates?: Array<{ id: number; name: string; emoji: string; category: string }>;
  styles?: Array<{ id: string; name: string; emoji: string }>;
}

interface AIToolTemplateProps {
  config: ToolConfig;
}

type Step = 'upload' | 'options' | 'generate' | 'result';

const AIToolTemplate: React.FC<AIToolTemplateProps> = ({ config }) => {
  const navigate = useNavigate();
  const { balance, spendTokens, getToolCost } = useTokens();
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [progress, setProgress] = useState(0);

  const toolCost = getToolCost(config.toolId, 'base');
  const canAfford = balance >= toolCost;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPhotos.push(reader.result as string);
          if (newPhotos.length === Math.min(files.length, config.uploadCount)) {
            setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
            if (uploadedPhotos.length + newPhotos.length >= config.uploadCount) {
              setCurrentStep(config.templates || config.styles ? 'options' : 'generate');
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleGenerate = () => {
    if (!canAfford) {
      alert(`You need ${toolCost} tokens. Current balance: ${balance}`);
      return;
    }

    const success = spendTokens(toolCost, `${config.name} creation`);
    if (!success) return;

    setCurrentStep('generate');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentStep('result');
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleTryAgain = () => {
    setCurrentStep('upload');
    setUploadedPhotos([]);
    setSelectedOption(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-2xl mr-4">
              ←
            </button>
            <h1 className="text-xl font-bold text-gray-900">{config.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg">
              <span className="text-sm">💎</span>
              <span className="text-sm font-bold">{balance}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Cost:</span>
              <span className="font-bold">{toolCost}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        {/* Upload Step */}
        {currentStep === 'upload' && (
          <div>
            <div className="text-center mb-6">
              <span className="text-6xl block mb-4">{config.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{config.instructions}</h2>
              <p className="text-gray-600">{config.description}</p>
            </div>

            <input
              type="file"
              id="file-upload"
              accept="image/jpeg,image/png"
              onChange={handleFileUpload}
              multiple={config.uploadCount > 1}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="block w-full h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 cursor-pointer transition-all"
            >
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <span className="text-6xl">📸</span>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">
                    Upload {config.uploadCount} {config.uploadCount > 1 ? 'photos' : 'photo'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">JPG or PNG, max 10MB each</p>
                </div>
              </div>
            </label>
          </div>
        )}

        {/* Options Step */}
        {currentStep === 'options' && (config.templates || config.styles) && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Choose {config.templates ? 'Template' : 'Style'}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {config.templates?.map((template) => (
                <Card
                  key={template.id}
                  onClick={() => setSelectedOption(template.id)}
                  hover
                  className={`aspect-square flex flex-col items-center justify-center space-y-2 ${
                    selectedOption === template.id ? 'border-gray-900 bg-gray-50' : ''
                  }`}
                >
                  <span className="text-5xl">{template.emoji}</span>
                  <span className="font-semibold text-gray-900 text-sm text-center">{template.name}</span>
                  <span className="text-xs text-gray-500">{template.category}</span>
                </Card>
              ))}
              {config.styles?.map((style) => (
                <Card
                  key={style.id}
                  onClick={() => setSelectedOption(style.id)}
                  hover
                  className={`aspect-square flex flex-col items-center justify-center space-y-2 ${
                    selectedOption === style.id ? 'border-gray-900 bg-gray-50' : ''
                  }`}
                >
                  <span className="text-5xl">{style.emoji}</span>
                  <span className="font-semibold text-gray-900 text-sm text-center">{style.name}</span>
                </Card>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handleGenerate}
                disabled={!selectedOption || !canAfford}
              >
                {!canAfford ? `Need ${toolCost - balance} more tokens` : `Generate (${toolCost} tokens)`}
              </Button>
              <Button variant="outline" size="large" fullWidth onClick={() => setCurrentStep('upload')}>
                ← Back
              </Button>
            </div>
          </div>
        )}

        {/* Generate Step */}
        {currentStep === 'generate' && (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <span className="text-6xl">{config.icon}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Creating Magic...</h2>
            <p className="text-gray-600 mb-8">This usually takes 10-30 seconds</p>

            <div className="max-w-xs mx-auto">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{progress}% complete</p>
            </div>
          </div>
        )}

        {/* Result Step */}
        {currentStep === 'result' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Creation</h2>

            <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl mb-4 block">{config.icon}</span>
                <p className="text-gray-600 font-medium">Generated Result Preview</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="primary" size="large" fullWidth onClick={() => navigate('/discover')}>
                📤 Publish to Feed
              </Button>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" size="medium" fullWidth>💾 Save</Button>
                <Button variant="outline" size="medium" fullWidth>🔗 Share</Button>
                <Button variant="outline" size="medium" fullWidth onClick={handleTryAgain}>🔄 Again</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIToolTemplate;
