import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PostInteraction {
  likes: Set<string>; // Set of post IDs that user has liked
  saved: Set<string>; // Set of post IDs that user has saved
  comments: Map<string, Comment[]>; // Map of post ID to comments array
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  avatar?: string;
  text: string;
  timestamp: Date;
  likes: number;
}

interface PostInteractionContextType {
  likes: Set<string>;
  saved: Set<string>;
  comments: Map<string, Comment[]>;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  isLiked: (postId: string) => boolean;
  getLikeCount: (postId: string, baseCount: number) => number;
  savePost: (postId: string) => void;
  unsavePost: (postId: string) => void;
  isSaved: (postId: string) => boolean;
  getSavedPosts: () => string[];
  addComment: (postId: string, text: string, username: string, avatar?: string) => void;
  getComments: (postId: string) => Comment[];
  getCommentCount: (postId: string, baseCount?: number) => number;
}

const PostInteractionContext = createContext<PostInteractionContextType | undefined>(undefined);

const INTERACTION_STORAGE_KEY = 'epiko_post_interactions';

export const PostInteractionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [likes, setLikes] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(INTERACTION_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return new Set(data.likes || []);
      }
    } catch (error) {
      console.error('Failed to load likes:', error);
    }
    return new Set();
  });

  const [saved, setSaved] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(INTERACTION_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return new Set(data.saved || []);
      }
    } catch (error) {
      console.error('Failed to load saved posts:', error);
    }
    return new Set();
  });

  const [comments, setComments] = useState<Map<string, Comment[]>>(() => {
    try {
      const stored = localStorage.getItem(INTERACTION_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.comments) {
          const map = new Map<string, Comment[]>();
          Object.entries(data.comments).forEach(([postId, commentList]) => {
            map.set(
              postId,
              (commentList as any[]).map((c) => ({
                ...c,
                timestamp: new Date(c.timestamp),
              }))
            );
          });
          return map;
        }
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
    return new Map();
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      const commentsObj: Record<string, Comment[]> = {};
      comments.forEach((value, key) => {
        commentsObj[key] = value;
      });

      localStorage.setItem(
        INTERACTION_STORAGE_KEY,
        JSON.stringify({
          likes: Array.from(likes),
          saved: Array.from(saved),
          comments: commentsObj,
        })
      );
    } catch (error) {
      console.error('Failed to save interactions:', error);
    }
  }, [likes, saved, comments]);

  const likePost = (postId: string) => {
    setLikes((prev) => new Set(prev).add(postId));
  };

  const unlikePost = (postId: string) => {
    setLikes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(postId);
      return newSet;
    });
  };

  const isLiked = (postId: string): boolean => {
    return likes.has(postId);
  };

  const getLikeCount = (postId: string, baseCount: number): number => {
    return isLiked(postId) ? baseCount + 1 : baseCount;
  };

  const savePost = (postId: string) => {
    setSaved((prev) => new Set(prev).add(postId));
  };

  const unsavePost = (postId: string) => {
    setSaved((prev) => {
      const newSet = new Set(prev);
      newSet.delete(postId);
      return newSet;
    });
  };

  const isSaved = (postId: string): boolean => {
    return saved.has(postId);
  };

  const getSavedPosts = (): string[] => {
    return Array.from(saved);
  };

  const addComment = (postId: string, text: string, username: string, avatar?: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      userId: '1', // Current user ID
      username,
      avatar,
      text,
      timestamp: new Date(),
      likes: 0,
    };

    setComments((prev) => {
      const newMap = new Map(prev);
      const postComments = newMap.get(postId) || [];
      newMap.set(postId, [newComment, ...postComments]);
      return newMap;
    });
  };

  const getComments = (postId: string): Comment[] => {
    return comments.get(postId) || [];
  };

  const getCommentCount = (postId: string, baseCount: number = 0): number => {
    const userComments = comments.get(postId) || [];
    return baseCount + userComments.length;
  };

  return (
    <PostInteractionContext.Provider
      value={{
        likes,
        saved,
        comments,
        likePost,
        unlikePost,
        isLiked,
        getLikeCount,
        savePost,
        unsavePost,
        isSaved,
        getSavedPosts,
        addComment,
        getComments,
        getCommentCount,
      }}
    >
      {children}
    </PostInteractionContext.Provider>
  );
};

export const usePostInteraction = () => {
  const context = useContext(PostInteractionContext);
  if (context === undefined) {
    throw new Error('usePostInteraction must be used within a PostInteractionProvider');
  }
  return context;
};
