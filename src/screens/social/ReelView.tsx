import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockReel = {
  id: 1,
  creator: {
    username: 'sarah_creates',
    avatar: '👩‍🎨',
    isFollowing: false,
  },
  content: {
    emoji: '🎨',
    tool: 'Face Swap',
  },
  stats: {
    likes: 234,
    comments: 12,
    shares: 5,
  },
  isLiked: false,
  isSaved: false,
};

const mockComments = [
  { id: 1, user: 'john_ai', avatar: '👨‍💼', text: 'This is amazing! 🔥', likes: 5 },
  { id: 2, user: 'creative_mind', avatar: '🧑‍🎨', text: 'Love the style!', likes: 3 },
  { id: 3, user: 'art_lover', avatar: '👩', text: 'How did you make this?', likes: 7 },
];

const ReelView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showComments, setShowComments] = useState(false);
  const [reel, setReel] = useState(mockReel);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setReel({
      ...reel,
      isLiked: !reel.isLiked,
      stats: {
        ...reel.stats,
        likes: reel.isLiked ? reel.stats.likes - 1 : reel.stats.likes + 1,
      },
    });
  };

  const handleSave = () => {
    setReel({ ...reel, isSaved: !reel.isSaved });
  };

  const handleFollow = () => {
    setReel({
      ...reel,
      creator: { ...reel.creator, isFollowing: !reel.creator.isFollowing },
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: 'You',
        avatar: '👤',
        text: newComment,
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setReel({
        ...reel,
        stats: { ...reel.stats, comments: reel.stats.comments + 1 },
      });
    }
  };

  return (
    <div className="h-screen bg-black relative">
      {/* Content */}
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <span className="text-9xl">{reel.content.emoji}</span>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-white text-2xl">
            ←
          </button>
          <span className="text-white text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            {reel.content.tool}
          </span>
        </div>
      </div>

      {/* Creator Info & Actions */}
      <div className="absolute bottom-20 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-end justify-between">
          {/* Creator Info */}
          <div className="flex-1 mr-4">
            <button
              onClick={() => navigate(`/profile/${reel.creator.username}`)}
              className="flex items-center space-x-3 mb-3"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                {reel.creator.avatar}
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-lg">{reel.creator.username}</p>
                <p className="text-white/80 text-sm">Tap to view profile</p>
              </div>
            </button>
            <button
              onClick={handleFollow}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                reel.creator.isFollowing
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              {reel.creator.isFollowing ? '✓ Following' : '+ Follow'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-6">
            <button onClick={handleLike} className="text-center">
              <span className={`text-4xl block ${reel.isLiked ? 'scale-110' : ''}`}>
                {reel.isLiked ? '❤️' : '🤍'}
              </span>
              <span className="text-white text-sm font-medium">{reel.stats.likes}</span>
            </button>

            <button onClick={() => setShowComments(true)} className="text-center">
              <span className="text-4xl block">💬</span>
              <span className="text-white text-sm font-medium">{reel.stats.comments}</span>
            </button>

            <button className="text-center">
              <span className="text-4xl block">🔗</span>
              <span className="text-white text-sm font-medium">{reel.stats.shares}</span>
            </button>

            <button onClick={handleSave} className="text-center">
              <span className="text-4xl block">{reel.isSaved ? '🔖' : '📑'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="absolute inset-0 bg-black/50 flex items-end" onClick={() => setShowComments(false)}>
          <div
            className="w-full bg-white rounded-t-3xl max-h-[70vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Comments Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">
                Comments ({comments.length})
              </h3>
              <button onClick={() => setShowComments(false)} className="text-2xl text-gray-400">
                ✕
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{comment.user}</span>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <p className="text-gray-900 mb-2">{comment.text}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <button className="hover:text-gray-900">❤️ {comment.likes}</button>
                      <button className="hover:text-gray-900">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="px-6 py-4 border-t-2 border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelView;
