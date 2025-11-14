import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostInteraction } from '../../context/PostInteractionContext';
import { BottomNavigation, Avatar } from '../../components/ui';
import {
  Search01Icon,
  FavouriteIcon,
  Message01Icon,
  Share08Icon,
  BookmarkAdd01Icon,
  SparklesIcon,
  MoreVerticalIcon
} from 'hugeicons-react';

interface Post {
  id: string;
  creator: {
    username: string;
    avatar: string;
  };
  image: string;
  tool: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: 'post_1',
    creator: { username: 'sarah_creates', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop',
    tool: 'Face Swap',
    timestamp: '2h',
    likes: 234,
    comments: 12,
  },
  {
    id: 'post_2',
    creator: { username: 'john_ai', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop',
    tool: 'AI Avatar',
    timestamp: '5h',
    likes: 567,
    comments: 34,
  },
  {
    id: 'post_3',
    creator: { username: 'creative_mike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    tool: 'HD Enhance',
    timestamp: '1d',
    likes: 890,
    comments: 45,
  },
  {
    id: 'post_4',
    creator: { username: 'art_lover', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    tool: 'Age Transform',
    timestamp: '2d',
    likes: 1234,
    comments: 89,
  },
];

const DiscoveryFeed: React.FC = () => {
  const navigate = useNavigate();
  const { isLiked, likePost, unlikePost, getLikeCount, isSaved, savePost, unsavePost, getCommentCount } = usePostInteraction();

  const handleLike = (postId: string) => {
    if (isLiked(postId)) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  const handleBookmark = (postId: string) => {
    if (isSaved(postId)) {
      unsavePost(postId);
    } else {
      savePost(postId);
    }
  };

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this ${post.tool} creation by @${post.creator.username}`,
        text: `Amazing AI creation using ${post.tool}`,
        url: window.location.origin + `/reel/${post.id}`,
      }).catch(() => {
        // User cancelled or error occurred
      });
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.origin + `/reel/${post.id}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-white">Feed</h1>
          <button
            onClick={() => navigate('/search')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:bg-dark-150 transition-colors"
          >
            <Search01Icon size={24} color="#ffffff" />
          </button>
        </div>
      </header>

      {/* Feed Content */}
      <main className="max-w-2xl mx-auto">
        {mockPosts.map((post) => {
          const postLiked = isLiked(post.id);
          const postSaved = isSaved(post.id);
          const likeCount = getLikeCount(post.id, post.likes);
          const commentCount = getCommentCount(post.id, post.comments);

          return (
          <article
            key={post.id}
            className="border-b border-dark-100 bg-black"
          >
            {/* Creator Header */}
            <div className="px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => navigate(`/profile/${post.creator.username}`)}
                className="flex items-center gap-3 min-w-0 flex-1"
              >
                <Avatar
                  name={post.creator.username}
                  src={post.creator.avatar}
                  size="medium"
                />
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-semibold text-white text-sm truncate max-w-full">
                    {post.creator.username}
                  </span>
                  <span className="text-xs text-dark-500">{post.timestamp}</span>
                </div>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 transition-colors flex-shrink-0">
                <MoreVerticalIcon size={20} color="#a3a3a3" />
              </button>
            </div>

            {/* Content Image */}
            <div
              className="w-full aspect-square bg-dark-100 cursor-pointer"
              onClick={() => navigate(`/reel/${post.id}`)}
            >
              <img
                src={post.image}
                alt={`${post.tool} by ${post.creator.username}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Actions Bar */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <FavouriteIcon
                      size={26}
                      color={postLiked ? '#ef4444' : '#ffffff'}
                      className={`transition-colors ${postLiked ? 'fill-current' : ''}`}
                    />
                  </button>

                  <button
                    onClick={() => navigate(`/reel/${post.id}`)}
                    className="flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <Message01Icon size={26} color="#ffffff" />
                  </button>

                  <button
                    onClick={() => handleShare(post)}
                    className="flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <Share08Icon size={26} color="#ffffff" />
                  </button>
                </div>

                <button
                  onClick={() => handleBookmark(post.id)}
                  className="active:scale-95 transition-transform"
                >
                  <BookmarkAdd01Icon
                    size={26}
                    color="#ffffff"
                    className={postSaved ? 'fill-current' : ''}
                  />
                </button>
              </div>

              {/* Likes Count */}
              <div className="mb-2">
                <span className="font-semibold text-white text-sm">
                  {likeCount.toLocaleString()} likes
                </span>
              </div>

              {/* Tool Badge Chip */}
              <div className="mb-3">
                <button
                  onClick={() => navigate('/tools')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 active:scale-95 transition-all"
                >
                  <SparklesIcon size={14} color="#ffffff" />
                  <span className="text-xs font-semibold text-white">
                    {post.tool}
                  </span>
                </button>
              </div>

              {/* Comments Link */}
              {commentCount > 0 && (
                <button
                  onClick={() => navigate(`/reel/${post.id}`)}
                  className="text-sm text-dark-500 hover:text-dark-600 transition-colors"
                >
                  View all {commentCount} comments
                </button>
              )}
            </div>
          </article>
          );
        })}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default DiscoveryFeed;
