import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

const SocialSignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSocialSignIn = (provider: string) => {
    // Mock social sign-in - in real app, this would trigger OAuth flow
    alert(`${provider} sign-in will be implemented with OAuth 2.0`);
    // For demo purposes, navigate to home
    // navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b-2 border-gray-200">
        <button onClick={() => navigate(-1)} className="text-2xl">
          ←
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Continue with
          </h1>
          <p className="text-gray-600">
            Quick and secure sign-in
          </p>
        </div>

        {/* Social Sign-In Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => handleSocialSignIn('Google')}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
          >
            <span className="text-2xl">🔵</span>
            <span className="font-semibold text-gray-900">Continue with Google</span>
          </button>

          <button
            onClick={() => handleSocialSignIn('Apple')}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <span className="text-2xl">🍎</span>
            <span className="font-semibold text-white">Continue with Apple</span>
          </button>

          <button
            onClick={() => handleSocialSignIn('Facebook')}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
          >
            <span className="text-2xl">📘</span>
            <span className="font-semibold text-gray-900">Continue with Facebook</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Email Sign-In Link */}
        <Button
          variant="outline"
          size="large"
          fullWidth
          onClick={() => navigate('/sign-in')}
        >
          Sign in with email
        </Button>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center mt-6">
          🔒 We never post without your permission
        </p>
      </div>
    </div>
  );
};

export default SocialSignIn;
