import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components/ui';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (validateEmail()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1500);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="px-6 py-5 border-b-2 border-gray-300 bg-white sticky top-0 z-10 shadow-medium">
          <button
            onClick={() => navigate('/sign-in')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <span className="text-xl">←</span>
          </button>
        </div>

        {/* Success Content */}
        <div className="p-6 max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-strong">
            <span className="text-5xl">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4 tracking-tight">
            Check Your Email
          </h1>
          <p className="text-gray-600 text-center text-lg mb-4 max-w-sm">
            We've sent a password reset link to:
          </p>
          <p className="text-blue-600 font-semibold text-center mb-8">
            {email}
          </p>
          <p className="text-sm text-gray-500 text-center mb-8 max-w-sm">
            Click the link in the email to reset your password. If you don't see it, check your spam folder.
          </p>
          <div className="w-full max-w-sm space-y-3">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => navigate('/sign-in')}
            >
              Back to Sign In
            </Button>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full text-center text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors"
            >
              Resend Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-5 border-b-2 border-gray-300 bg-white sticky top-0 z-10 shadow-medium">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <span className="text-xl">←</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-w-md mx-auto">
        <div className="mb-10 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-medium border-2 border-primary-500">
            <span className="text-4xl">🔑</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-3 tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="space-y-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
            error={error}
            required
          />
          <p className="text-sm text-gray-600">
            We'll send you a link to reset your password
          </p>
        </div>

        <div className="mt-8 space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <Button
            variant="outline"
            size="large"
            fullWidth
            onClick={() => navigate('/sign-in')}
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
