import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTokens } from '../../context/TokenContext';
import { Card, Button, BottomNavigation } from '../../components/ui';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { balance } = useTokens();

  const quickActions = [
    { id: 'wallet', name: 'Wallet', icon: '💎', path: '/wallet' },
    { id: 'rewards', name: 'Rewards', icon: '🎁', path: '/rewards' },
    { id: 'notifications', name: 'Notifications', icon: '🔔', path: '/notifications' },
    { id: 'plans', name: 'Upgrade', icon: '⭐', path: '/plans' },
  ];

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      signOut();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </header>

      {/* Account Info */}
      <div className="p-6">
        <Card className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
              {user?.avatar || '👤'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{user?.fullName}</h2>
              <p className="text-gray-600">@{user?.username}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={() => alert('Edit account coming soon')}
              className="text-gray-600 hover:text-gray-900"
            >
              ✏️
            </button>
          </div>
        </Card>
      </div>

      {/* Subscription Status */}
      <div className="px-6 pb-6">
        <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Free Plan</h3>
              <p className="text-sm text-gray-600">30 tokens/month</p>
            </div>
            <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-bold text-gray-900">
              FREE
            </span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>✓</span>
              <span>Standard quality</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>✓</span>
              <span>Watermarked outputs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>✓</span>
              <span>5 downloads/day</span>
            </div>
          </div>
          <Button variant="primary" size="medium" fullWidth onClick={() => navigate('/plans')}>
            Upgrade to Creator or Pro
          </Button>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">💎</div>
            <p className="text-2xl font-bold text-gray-900">{balance}</p>
            <p className="text-xs text-gray-600">Tokens</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">🎨</div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-600">Creations</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">❤️</div>
            <p className="text-2xl font-bold text-gray-900">234</p>
            <p className="text-xs text-gray-600">Likes</p>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.id}
              onClick={() => navigate(action.path)}
              hover
              className="aspect-square flex flex-col items-center justify-center space-y-2 p-4"
            >
              <span className="text-3xl">{action.icon}</span>
              <span className="text-xs font-medium text-gray-900 text-center">{action.name}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="px-6 pb-6">
        <Card className="divide-y-2 divide-gray-200">
          <button className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="font-medium text-gray-900">Privacy Settings</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="font-medium text-gray-900">Terms of Service</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="font-medium text-gray-900">Help & Support</span>
            <span className="text-gray-400">›</span>
          </button>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-6 py-4 hover:bg-red-50 transition-colors text-red-600 font-medium"
          >
            Sign Out
          </button>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
