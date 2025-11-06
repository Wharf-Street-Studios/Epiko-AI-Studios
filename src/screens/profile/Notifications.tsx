import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui';

interface Notification {
  id: number;
  type: 'follow' | 'like' | 'comment' | 'system';
  user?: { username: string; avatar: string };
  content: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: 1, type: 'follow', user: { username: 'sarah_creates', avatar: '👩‍🎨' }, content: 'started following you', timestamp: '2h ago', read: false },
  { id: 2, type: 'like', user: { username: 'john_ai', avatar: '👨‍💼' }, content: 'liked your creation', timestamp: '5h ago', read: false },
  { id: 3, type: 'comment', user: { username: 'creative_mind', avatar: '🧑‍🎨' }, content: 'commented: "Amazing work!"', timestamp: '1d ago', read: false },
  { id: 4, type: 'system', content: '🎁 You earned 25 tokens from weekly streak!', timestamp: '2d ago', read: true },
  { id: 5, type: 'like', user: { username: 'art_lover', avatar: '👩' }, content: 'liked your creation', timestamp: '3d ago', read: true },
];

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'follow': return '👤';
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'system': return '🔔';
      default: return '📢';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-2xl mr-4">
              ←
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          <button className="text-sm text-gray-600 font-medium hover:text-gray-900">
            Mark all read
          </button>
        </div>
      </header>

      {/* Notifications List */}
      <main className="p-4 space-y-2">
        {mockNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 ${notification.read ? 'opacity-60' : ''}`}
            hover
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {notification.type === 'system' ? getNotificationIcon(notification.type) : notification.user?.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900">
                  {notification.user && (
                    <span className="font-semibold">{notification.user.username} </span>
                  )}
                  {notification.content}
                </p>
                <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default Notifications;
