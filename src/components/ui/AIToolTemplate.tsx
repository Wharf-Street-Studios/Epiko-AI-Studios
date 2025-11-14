import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCredits } from '../../context/TokenContext';
import { Button } from './index';
import { ArrowLeft01Icon, SparklesIcon, Image02Icon, Download04Icon, Share08Icon, Rotate01Icon, Coins01Icon } from 'hugeicons-react';

interface ToolConfig {
  name: string;
  icon: string;
  toolId: string;
  description: string;
  instructions: string;
  uploadCount: number; // How many images needed
  templates?: Array<{ id: number; name: string; emoji?: string; icon?: React.ComponentType<any>; category: string }>;
  styles?: Array<{ id: string; name: string; emoji?: string; icon?: React.ComponentType<any> }>;
}

interface AIToolTemplateProps {
  config: ToolConfig;
}

type Step = 'upload' | 'options' | 'generate' | 'result';

const AIToolTemplate: React.FC<AIToolTemplateProps> = ({ config }) => {
  const navigate = useNavigate();
  const { balance, spendCredits, getToolCost } = useCredits();
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [progress, setProgress] = useState(0);

  const toolCost = getToolCost(config.toolId);
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

    const success = spendCredits(toolCost, `${config.name} creation`);
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
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
            >
              <ArrowLeft01Icon size={24} color="#ffffff" />
            </button>
            <h1 className="text-xl font-bold text-white ml-3">{config.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-dark-100 px-3 py-2 rounded-xl">
              <Coins01Icon size={18} color="#3b82f6" />
              <span className="text-sm font-bold text-white">{balance}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-dark-500">
              <span>Cost:</span>
              <span className="font-bold text-white">{toolCost}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 max-w-2xl mx-auto">
        {/* Upload Step */}
        {currentStep === 'upload' && (
          <div>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{config.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{config.instructions}</h2>
              <p className="text-dark-500">{config.description}</p>
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
              className="block w-full h-64 border-2 border-dashed border-dark-100 bg-dark-100/50 rounded-3xl hover:border-white cursor-pointer transition-all"
            >
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <Image02Icon size={60} color="#ffffff" />
                <div className="text-center">
                  <p className="font-semibold text-white">
                    Upload {config.uploadCount} {config.uploadCount > 1 ? 'photos' : 'photo'}
                  </p>
                  <p className="text-sm text-dark-500 mt-1">JPG or PNG, max 10MB each</p>
                </div>
              </div>
            </label>
          </div>
        )}

        {/* Options Step */}
        {currentStep === 'options' && (config.templates || config.styles) && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Choose {config.templates ? 'Template' : 'Style'}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {config.templates?.map((template) => {
                const IconComponent = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => setSelectedOption(template.id)}
                    className={`bg-dark-100 rounded-3xl p-5 aspect-square flex flex-col items-center justify-center gap-2 transition-all ${
                      selectedOption === template.id ? 'border-2 border-white bg-dark-150' : 'hover:bg-dark-150'
                    }`}
                  >
                    {IconComponent ? (
                      <IconComponent size={48} color="#ffffff" />
                    ) : (
                      <span className="text-5xl">{template.emoji}</span>
                    )}
                    <span className="font-semibold text-white text-sm text-center">{template.name}</span>
                    <span className="text-xs text-dark-500">{template.category}</span>
                  </button>
                );
              })}
              {config.styles?.map((style) => {
                const IconComponent = style.icon;
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedOption(style.id)}
                    className={`bg-dark-100 rounded-3xl p-5 aspect-square flex flex-col items-center justify-center gap-2 transition-all ${
                      selectedOption === style.id ? 'border-2 border-white bg-dark-150' : 'hover:bg-dark-150'
                    }`}
                  >
                    {IconComponent ? (
                      <IconComponent size={48} color="#ffffff" />
                    ) : (
                      <span className="text-5xl">{style.emoji}</span>
                    )}
                    <span className="font-semibold text-white text-sm text-center">{style.name}</span>
                  </button>
                );
              })}
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
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Generate Step */}
        {currentStep === 'generate' && (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-dark-100 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <SparklesIcon size={64} color="#ffffff" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Creating Magic...</h2>
            <p className="text-dark-500 mb-8">This usually takes 10-30 seconds</p>

            <div className="max-w-xs mx-auto">
              <div className="w-full h-3 bg-dark-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-dark-500 mt-2">{progress}% complete</p>
            </div>
          </div>
        )}

        {/* Result Step */}
        {currentStep === 'result' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Creation</h2>

            <div className="w-full aspect-square bg-dark-100 rounded-3xl mb-6 flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl mb-4 block">{config.icon}</span>
                <p className="text-dark-500 font-medium">Generated Result Preview</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="primary" size="large" fullWidth onClick={() => navigate('/discover')}>
                <Share08Icon size={20} color="#000000" className="mr-2" />
                Publish to Feed
              </Button>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" size="medium" fullWidth>
                  <Download04Icon size={20} color="#ffffff" />
                </Button>
                <Button variant="outline" size="medium" fullWidth>
                  <Share08Icon size={20} color="#ffffff" />
                </Button>
                <Button variant="outline" size="medium" fullWidth onClick={handleTryAgain}>
                  <Rotate01Icon size={20} color="#ffffff" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIToolTemplate;
