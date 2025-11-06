import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui';

const presetAvatars = [
  '👨', '👩', '🧑', '👨‍💼', '👩‍💼', '🧑‍💼',
  '👨‍🎨', '👩‍🎨', '🧑‍🎨',
];

const CreateAccountAvatar: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user came from previous step
    const accountDetails = sessionStorage.getItem('accountDetails');
    if (!accountDetails) {
      navigate('/create-account');
    }
  }, [navigate]);

  const handleCompleteSetup = async () => {
    const accountDetails = sessionStorage.getItem('accountDetails');
    if (!accountDetails) {
      navigate('/create-account');
      return;
    }

    const { fullName, email, username, password } = JSON.parse(accountDetails);

    setLoading(true);
    try {
      await signUp(fullName, email, username, password, selectedAvatar);
      sessionStorage.removeItem('accountDetails');
      // Auto-navigate to Home after completion
      setTimeout(() => {
        navigate('/home');
      }, 500);
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b-2 border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl"
        >
          ←
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Avatar
        </h1>
        <p className="text-gray-600 mb-8">
          Select a preset or upload your own
        </p>

        {/* Upload Custom Avatar */}
        <div className="mb-8">
          <button className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-all duration-200 flex flex-col items-center justify-center space-y-2">
            <span className="text-4xl">📷</span>
            <span className="text-sm text-gray-600 font-medium">Upload Custom Avatar</span>
          </button>
        </div>

        {/* Preset Avatars */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Preset Avatars
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {presetAvatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() => setSelectedAvatar(avatar)}
                className={`aspect-square rounded-xl border-2 transition-all duration-200 flex items-center justify-center text-5xl
                  ${selectedAvatar === avatar
                    ? 'border-gray-900 bg-gray-50 scale-95'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }
                `}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleCompleteSetup}
            disabled={!selectedAvatar || loading}
          >
            {loading ? 'Creating Account...' : 'Complete Setup'}
          </Button>

          <button
            onClick={handleCompleteSetup}
            className="w-full text-center text-gray-500 text-sm"
            disabled={loading}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountAvatar;
