/* eslint-disable @typescript-eslint/no-explicit-any */
// types/idea.ts
import { IdeaStatus, IdeaAccessType } from "@/types/enums";

export interface Idea {
  id: string;
  title: string;
  slug: string;
  description: string;
  problemStatement: string;
  proposedSolution: string;
  status: IdeaStatus;
  accessType: IdeaAccessType;
  price?: string | number | null;
  rejectionFeedback?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  categoryId: string;
  author: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    role: string;
    userStatus: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  comments: any[];
  votes: any[];
  purchases: any[];
  images?: string[];
  _count?: {
    votes: number;
    comments: number;
  };
}
