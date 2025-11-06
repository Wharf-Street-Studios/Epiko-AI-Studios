import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';

type Step = 'upload' | 'template' | 'generate' | 'result';

const templates = [
  { id: 1, name: 'Romantic Sunset', category: 'Romantic', emoji: '🌅' },
  { id: 2, name: 'Professional', category: 'Business', emoji: '💼' },
  { id: 3, name: 'Vintage', category: 'Retro', emoji: '📷' },
  { id: 4, name: 'Dreamy', category: 'Fantasy', emoji: '✨' },
  { id: 5, name: 'Beach Vibes', category: 'Travel', emoji: '🏖️' },
  { id: 6, name: 'City Lights', category: 'Urban', emoji: '🌃' },
];

const FaceSwapTool: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
        setCurrentStep('template');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const handleGenerate = () => {
    setCurrentStep('generate');
    setIsGenerating(true);
    setProgress(0);

    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGeneratedImage('generated-mock-image');
          setCurrentStep('result');
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handlePublish = () => {
    alert('Content published to Discovery Feed!');
    navigate('/discover');
  };

  const handleTryAgain = () => {
    setCurrentStep('upload');
    setUploadedPhoto(null);
    setSelectedTemplate(null);
    setGeneratedImage(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-2xl mr-4">
            ←
          </button>
          <h1 className="text-xl font-bold text-gray-900">Face Swap</h1>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="px-6 py-4 border-b-2 border-gray-200">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className={`flex flex-col items-center ${currentStep === 'upload' ? 'text-gray-900' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep === 'upload' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="text-xs font-medium">Upload</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
          <div className={`flex flex-col items-center ${currentStep === 'template' || currentStep === 'generate' || currentStep === 'result' ? 'text-gray-900' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep === 'template' || currentStep === 'generate' || currentStep === 'result' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="text-xs font-medium">Template</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
          <div className={`flex flex-col items-center ${currentStep === 'generate' || currentStep === 'result' ? 'text-gray-900' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep === 'generate' || currentStep === 'result' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="text-xs font-medium">Generate</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="p-6">
        {/* Step 1: Upload Photo */}
        {currentStep === 'upload' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Photo</h2>
            <p className="text-gray-600 mb-6">Choose a clear photo with your face visible</p>

            <input
              type="file"
              id="file-upload"
              accept="image/jpeg,image/png"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="block w-full h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 cursor-pointer transition-all duration-200"
            >
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <span className="text-6xl">📸</span>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">Tap to upload photo</p>
                  <p className="text-sm text-gray-500 mt-1">JPG or PNG, max 10MB</p>
                </div>
              </div>
            </label>

            <div className="mt-6">
              <Button variant="secondary" size="large" fullWidth>
                📷 Take Photo
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Template */}
        {currentStep === 'template' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Template</h2>
            <p className="text-gray-600 mb-6">Select a template for your face swap</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  hover
                  className={`aspect-square flex flex-col items-center justify-center space-y-2 ${
                    selectedTemplate === template.id ? 'border-gray-900 bg-gray-50' : ''
                  }`}
                >
                  <span className="text-5xl">{template.emoji}</span>
                  <span className="font-semibold text-gray-900 text-sm text-center">
                    {template.name}
                  </span>
                  <span className="text-xs text-gray-500">{template.category}</span>
                </Card>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handleGenerate}
                disabled={!selectedTemplate}
              >
                Generate ✨
              </Button>
              <Button
                variant="outline"
                size="large"
                fullWidth
                onClick={() => setCurrentStep('upload')}
              >
                ← Back
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Generating */}
        {currentStep === 'generate' && (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <span className="text-6xl">✨</span>
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

        {/* Step 4: Result View */}
        {currentStep === 'result' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Creation</h2>

            {/* Result Preview */}
            <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <span className="text-8xl mb-4 block">🎨</span>
                <p className="text-gray-600 font-medium">Generated Image Preview</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="primary" size="large" fullWidth onClick={handlePublish}>
                📤 Publish
              </Button>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" size="medium" fullWidth>
                  💾 Download
                </Button>
                <Button variant="outline" size="medium" fullWidth>
                  🔗 Share
                </Button>
                <Button variant="outline" size="medium" fullWidth onClick={handleTryAgain}>
                  🔄 Try Again
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FaceSwapTool;
