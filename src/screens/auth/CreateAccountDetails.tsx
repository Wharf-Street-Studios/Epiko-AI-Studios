import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components/ui';

const CreateAccountDetails: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Store form data in sessionStorage to pass to next screen
      sessionStorage.setItem('accountDetails', JSON.stringify({
        fullName,
        email,
        username,
        password,
      }));
      navigate('/create-account/avatar');
    }
  };

  const getPasswordStrength = () => {
    if (!password) return '';
    if (password.length < 8) return 'Weak';
    if (password.length < 12) return 'Medium';
    return 'Strong';
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
          Create Account
        </h1>
        <p className="text-gray-600 mb-8">
          Fill in your details to get started
        </p>

        <div className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={setFullName}
            error={errors.fullName}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
            error={errors.email}
            required
          />

          <div>
            <Input
              label="Username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={setUsername}
              error={errors.username}
              helperText="Your unique username (minimum 3 characters)"
              required
            />
            {username && !errors.username && (
              <p className="mt-2 text-sm text-green-600">✓ Username is available</p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              error={errors.password}
              required
            />
            {password && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      getPasswordStrength() === 'Weak'
                        ? 'w-1/3 bg-red-500'
                        : getPasswordStrength() === 'Medium'
                        ? 'w-2/3 bg-yellow-500'
                        : 'w-full bg-green-500'
                    }`}
                  />
                </div>
                <span className="text-sm text-gray-600">{getPasswordStrength()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountDetails;
