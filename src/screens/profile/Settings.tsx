import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, BottomNavigation } from '../../components/ui';
import {
  PencilEdit01Icon,
  Wallet01Icon,
  Notification02Icon,
  LockIcon,
  Logout01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon
} from 'hugeicons-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      signOut();
      navigate('/welcome');
    }
  };

  const settingsOptions = [
    {
      icon: PencilEdit01Icon,
      label: 'Edit Profile',
      description: 'Update your profile information',
      onClick: () => navigate('/profile/edit'),
    },
    {
      icon: Wallet01Icon,
      label: 'Wallet & Tokens',
      description: 'Manage your Epiko Tokens',
      onClick: () => navigate('/wallet'),
    },
    {
      icon: Notification02Icon,
      label: 'Notifications',
      description: 'Manage notification preferences',
      onClick: () => navigate('/notifications'),
    },
    {
      icon: LockIcon,
      label: 'Privacy & Security',
      description: 'Control your privacy settings',
      onClick: () => alert('Privacy settings coming soon'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-5 sticky top-0 z-10 shadow-soft">
        <div className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ArrowLeft01Icon size={20} color="#374151" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
        </div>
      </header>

      {/* Settings Options */}
      <main className="p-6 space-y-6">
        {/* Account Settings */}
        <section className="animate-slide-up">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-1">
            Account
          </h2>
          <Card className="divide-y divide-gray-100 p-0">
            {settingsOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  onClick={option.onClick}
                  className="w-full px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-all duration-300 group first:rounded-t-2xl last:rounded-b-2xl"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-soft border border-gray-100">
                    <Icon size={20} color="#2563eb" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{option.label}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{option.description}</p>
                  </div>
                  <ArrowRight01Icon size={20} color="#9ca3af" className="group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                </button>
              );
            })}
          </Card>
        </section>

        {/* Danger Zone */}
        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-1">
            Danger Zone
          </h2>
          <Card className="p-0">
            <button
              onClick={handleSignOut}
              className="w-full px-5 py-4 flex items-center gap-4 hover:bg-red-50 transition-all duration-300 text-red-600 group rounded-2xl"
            >
              <div className="p-3 bg-red-100 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Logout01Icon size={20} color="#dc2626" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold">Sign Out</p>
                <p className="text-sm text-red-500 mt-0.5">Sign out of your account</p>
              </div>
              <ArrowRight01Icon size={20} color="#f87171" className="group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </Card>
        </section>

        {/* App Info */}
        <div className="text-center pt-6 space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-gray-600 font-semibold">Epiko AI Studios</p>
          <p className="text-xs text-gray-500">Version 1.0.0</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Settings;
