import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/ui';

const SignInScreen: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        await signIn(email, password);
        navigate('/home');
      } catch (error) {
        setErrors({ form: 'Invalid email or password' });
        setLoading(false);
      }
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
        <div className="mb-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center">
            Sign in to continue creating
          </p>
        </div>

        {errors.form && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.form}</p>
          </div>
        )}

        <div className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            error={errors.password}
            required
          />

          <div className="flex justify-end">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Forgot Password?
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={() => navigate('/create-account')}
            className="text-gray-900 font-semibold hover:underline"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
