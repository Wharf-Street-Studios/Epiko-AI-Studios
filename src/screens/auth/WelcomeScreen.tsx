import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50">
      {/* App Branding */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">✨</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Lorven Studios AI
        </h1>
        <p className="text-lg text-gray-600 max-w-sm mx-auto">
          Create amazing AI-powered content with professional-quality results
        </p>
      </div>

      {/* Value Proposition */}
      <div className="w-full max-w-sm space-y-4 mb-12">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">🎨</span>
          <div>
            <h3 className="font-semibold text-gray-900">AI-Powered Tools</h3>
            <p className="text-sm text-gray-600">Face swap, scene swap, and colorize photos instantly</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-2xl">🌟</span>
          <div>
            <h3 className="font-semibold text-gray-900">Discover & Share</h3>
            <p className="text-sm text-gray-600">Join a creative community of content creators</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-2xl">🚀</span>
          <div>
            <h3 className="font-semibold text-gray-900">Create in Seconds</h3>
            <p className="text-sm text-gray-600">Professional results without design skills</p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="w-full max-w-sm space-y-4">
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
      <p className="text-xs text-gray-400 mt-8 text-center">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default WelcomeScreen;
