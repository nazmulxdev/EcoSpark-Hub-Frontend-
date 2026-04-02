/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { castVote } from "@/actions/client/vote.client";
import { authClient } from "@/lib/auth-client";
import { VoteType } from "@/types/enums";

interface VoteButtonProps {
  ideaId: string;
  initialVotes: number;
  initialUserVote?: VoteType | null;
  onVoteChange?: (votes: number, userVote: VoteType | null) => void;
}

export function VoteButton({
  ideaId,
  initialVotes,
  initialUserVote = null,
  onVoteChange,
}: VoteButtonProps) {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<VoteType | null>(initialUserVote);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data);
    };
    getSession();
  }, []);

  const isAuthenticated = !!session?.user;

  const handleVote = async (type: VoteType) => {
    if (!isAuthenticated) {
      toast.error("Please login to vote");
      router.push(`/login?redirect=/ideas/${ideaId}`);
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Processing vote...");

    try {
      const result = await castVote(ideaId, type);

      if (result.error) {
        toast.error(result.error.message || "Failed to vote", { id: toastId });
        setIsLoading(false);
        return;
      }

      // Update local state based on response
      if (result.data === null) {
        // Vote removed (toggled off)
        const newVotes = userVote === type ? votes - 1 : votes;
        setVotes(newVotes);
        setUserVote(null);
        toast.success("Vote removed", { id: toastId });
        onVoteChange?.(newVotes, null);
      } else if (userVote && userVote !== type) {
        // Changed vote type
        setVotes(votes);
        setUserVote(type);
        toast.success(`Changed to ${type.toLowerCase()}`, { id: toastId });
        onVoteChange?.(votes, type);
      } else {
        // New vote
        const newVotes = type === VoteType.UPVOTE ? votes + 1 : votes - 1;
        setVotes(newVotes);
        setUserVote(type);
        toast.success(`${type.toLowerCase()}d successfully`, { id: toastId });
        onVoteChange?.(newVotes, type);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVote(VoteType.UPVOTE)}
        disabled={isLoading}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
          userVote === VoteType.UPVOTE
            ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
            : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
        }`}
        aria-label="Upvote"
      >
        <ThumbsUp
          className={`w-4 h-4 ${userVote === VoteType.UPVOTE ? "fill-current" : ""}`}
        />
        <span className="font-medium">{votes > 0 ? votes : 0}</span>
      </button>

      <button
        onClick={() => handleVote(VoteType.DOWNVOTE)}
        disabled={isLoading}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
          userVote === VoteType.DOWNVOTE
            ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
            : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
        }`}
        aria-label="Downvote"
      >
        <ThumbsDown
          className={`w-4 h-4 ${userVote === VoteType.DOWNVOTE ? "fill-current" : ""}`}
        />
      </button>
    </div>
  );
}
