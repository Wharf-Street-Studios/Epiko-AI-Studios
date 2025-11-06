import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../../context/TokenContext';
import { Card, Button, BottomNavigation } from '../../components/ui';

const dailyMissions = [
  { id: 1, title: 'Create 3 AI images', reward: 5, progress: 1, total: 3, completed: false },
  { id: 2, title: 'Share a creation', reward: 3, progress: 0, total: 1, completed: false },
  { id: 3, title: 'Like 5 posts', reward: 2, progress: 3, total: 5, completed: false },
];

const achievements = [
  { id: 1, title: 'First Creation', emoji: '🎨', reward: 10, progress: 100, unlocked: true },
  { id: 2, title: 'Social Butterfly', emoji: '🦋', reward: 25, progress: 60, unlocked: false },
  { id: 3, title: '7-Day Streak', emoji: '🔥', reward: 50, progress: 40, unlocked: false },
  { id: 4, title: '100 Creations', emoji: '💯', reward: 100, progress: 25, unlocked: false },
];

const Rewards: React.FC = () => {
  const navigate = useNavigate();
  const { earnTokens } = useTokens();

  const handleClaimMission = (missionId: number, reward: number) => {
    earnTokens(reward, 'Daily mission completed');
    alert(`Claimed ${reward} tokens!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-2xl mr-4">
            ←
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Rewards</h1>
        </div>
      </header>

      {/* Streak Counter */}
      <div className="p-6">
        <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white text-center">
          <p className="text-sm opacity-90 mb-2">Daily Login Streak</p>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-5xl">🔥</span>
            <span className="text-5xl font-bold">3</span>
          </div>
          <p className="text-sm opacity-90">days in a row</p>
        </Card>
      </div>

      {/* Daily Missions */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Daily Missions</h2>
          <span className="text-sm text-gray-500">Resets in 18h</span>
        </div>
        <div className="space-y-3">
          {dailyMissions.map((mission) => (
            <Card key={mission.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">{mission.title}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 transition-all"
                        style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {mission.progress}/{mission.total}
                    </span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="text-sm">💎</span>
                    <span className="font-bold text-gray-900">{mission.reward}</span>
                  </div>
                  {mission.progress >= mission.total ? (
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => handleClaimMission(mission.id, mission.reward)}
                    >
                      Claim
                    </Button>
                  ) : (
                    <span className="text-xs text-gray-500">In progress</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`p-4 text-center ${
                achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50' : 'opacity-60'
              }`}
            >
              <div className="text-5xl mb-2 filter grayscale-0">
                {achievement.emoji}
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-2">{achievement.title}</p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gray-900 transition-all"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mb-2">{achievement.progress}% Complete</p>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-xs">💎</span>
                <span className="text-xs font-bold text-gray-900">{achievement.reward}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Refer Friends</h2>
        <Card className="p-6">
          <div className="text-center mb-4">
            <span className="text-6xl block mb-4">🎁</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Earn 50 Tokens</h3>
            <p className="text-gray-600 text-sm">
              For each friend who signs up using your referral link
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center justify-between">
            <code className="text-sm text-gray-900 font-mono">lorven.ai/r/USER123</code>
            <button className="text-2xl">📋</button>
          </div>
          <Button variant="primary" size="large" fullWidth>
            Share Referral Link
          </Button>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Rewards;
