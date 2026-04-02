/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Send, Trash2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import {
  getComments,
  createComment,
  deleteComment,
} from "@/actions/client/comment.client";
import { authClient } from "@/lib/auth-client";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  isDeleted: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  replies: Comment[];
}

interface CommentsSectionProps {
  ideaId: string;
  initialCount?: number;
}

export function CommentsSection({
  ideaId,
  initialCount = 0,
}: CommentsSectionProps) {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Get session on client side
  useEffect(() => {
    const getSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data);
    };
    getSession();
  }, []);

  const isAuthenticated = !!session?.user;

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    const result = await getComments(ideaId);
    if (result.data) {
      setComments(result.data);
    }
    setIsLoading(false);
  }, [ideaId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);

    const result = await createComment(ideaId, newComment);
    if (result.data) {
      setNewComment("");
      await loadComments();
      toast.success("Comment added!");
    } else {
      if (result.error?.code === "UNAUTHORIZED") {
        toast.error("Please login to comment");
        router.push(`/login?redirect=/ideas/${ideaId}`);
      } else {
        toast.error(result.error?.message || "Failed to add comment");
      }
    }
    setIsSubmitting(false);
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent(""); // Clear reply content when opening new reply
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return;
    setIsSubmittingReply(true);

    const result = await createComment(ideaId, replyContent, parentId);
    if (result.data) {
      setReplyContent("");
      setReplyingTo(null);
      await loadComments();
      toast.success("Reply added!");
    } else {
      toast.error(result.error?.message || "Failed to add reply");
    }
    setIsSubmittingReply(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    const result = await deleteComment(commentId, ideaId);
    if (result.data) {
      await loadComments();
      toast.success("Comment deleted!");
    } else {
      toast.error(result.error?.message || "Failed to delete comment");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: Comment;
    isReply?: boolean;
  }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [localReplyContent, setLocalReplyContent] = useState("");
    const [isLocalSubmitting, setIsLocalSubmitting] = useState(false);

    const canModify = session?.user?.id === comment.user.id;
    const isDeleted = comment.isDeleted;

    const handleLocalReply = async () => {
      if (!localReplyContent.trim()) return;
      setIsLocalSubmitting(true);

      const result = await createComment(ideaId, localReplyContent, comment.id);
      if (result.data) {
        setLocalReplyContent("");
        setIsReplying(false);
        await loadComments();
        toast.success("Reply added!");
      } else {
        toast.error(result.error?.message || "Failed to add reply");
      }
      setIsLocalSubmitting(false);
    };

    return (
      <div
        className={`${!isReply && "border-b border-gray-100 dark:border-zinc-800 pb-4 mb-4"} ${isReply && "ml-8 md:ml-12 mt-3"}`}
      >
        <div className="flex gap-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={comment.user.image || undefined} />
            <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 text-xs">
              {getInitials(comment.user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm text-gray-900 dark:text-white">
                {comment.user.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 break-words">
              {isDeleted ? (
                <span className="italic text-gray-400">
                  [This comment has been deleted]
                </span>
              ) : (
                comment.content
              )}
            </p>

            {!isDeleted && !isReply && (
              <div className="flex gap-3 mt-2">
                {isAuthenticated && (
                  <button
                    onClick={() => setIsReplying(!isReplying)}
                    className="text-xs text-gray-500 hover:text-green-600 transition-colors"
                  >
                    Reply
                  </button>
                )}
                {canModify && !isDeleted && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}

            {/* Reply input */}
            {isReplying && (
              <div className="mt-3">
                <Textarea
                  placeholder="Write a reply..."
                  value={localReplyContent}
                  onChange={(e) => setLocalReplyContent(e.target.value)}
                  className="text-sm"
                  rows={2}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    onClick={handleLocalReply}
                    disabled={isLocalSubmitting || !localReplyContent.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isLocalSubmitting ? (
                      <Loader2 className="w-3 h-3 animate-spin mr-1" />
                    ) : (
                      <Send className="w-3 h-3 mr-1" />
                    )}
                    Reply
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsReplying(false);
                      setLocalReplyContent("");
                    }}
                    variant="outline"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const totalComments = comments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0,
  );

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-green-500" />
        Discussion ({totalComments})
      </h3>

      {/* Comment Input */}
      {isAuthenticated ? (
        <div className="mb-8">
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-3"
            rows={3}
          />
          <Button
            onClick={handleSubmitComment}
            disabled={isSubmitting || !newComment.trim()}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="text-center py-6 mb-6 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Login to join the discussion
          </p>
          <Button asChild variant="outline">
            <a href={`/login?redirect=/ideas/${ideaId}`}>Login to Comment</a>
          </Button>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-green-500" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
