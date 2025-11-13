import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { SparklesIcon, PaintBrush01Icon, StarIcon, Rocket01Icon } from 'hugeicons-react';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* App Branding */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-strong animate-scale-in">
          <SparklesIcon size={56} color="#ffffff" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Epiko AI Studios
        </h1>
        <p className="text-lg text-gray-600 max-w-sm mx-auto leading-relaxed">
          Create amazing AI-powered content with professional-quality results
        </p>
      </div>

      {/* Value Proposition */}
      <div className="w-full max-w-sm space-y-5 mb-12">
        <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl shadow-medium hover:shadow-strong border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-medium border-2 border-blue-200">
            <PaintBrush01Icon size={24} color="#2563eb" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">AI-Powered Tools</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Face swap, scene swap, and colorize photos instantly</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl shadow-medium hover:shadow-strong border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-medium border-2 border-blue-200">
            <StarIcon size={24} color="#2563eb" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Discover & Share</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Join a creative community of content creators</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl shadow-medium hover:shadow-strong border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-medium border-2 border-blue-200">
            <Rocket01Icon size={24} color="#2563eb" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Create in Seconds</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Professional results without design skills</p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="w-full max-w-sm space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={() => navigate('/create-account')}
        >
          Create New Account
        </Button>
        <Button
          variant="outline"
          size="large"
          fullWidth
          onClick={() => navigate('/sign-in')}
        >
          Sign In
        </Button>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-500 mt-10 text-center max-w-xs leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default WelcomeScreen;
