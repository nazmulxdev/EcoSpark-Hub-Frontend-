import {
  IdeaAccessType,
  IdeaStatus,
  MemberStatus,
  UserStatus,
  VoteType,
} from "@/types/enums";

export interface ICreateCategory {
  name: string;
  slug?: string;
  isActive?: boolean;
}

export interface IUpdateCategory {
  name?: string;
  slug?: string;
  isActive?: boolean;
}

export interface IChangeUserStatus {
  userStatus: UserStatus;
}

export interface IChangeMemberStatus {
  status: MemberStatus;
}

export interface IChangeIdeaStatus {
  status: IdeaStatus;
  rejectionFeedback?: string;
}

export interface ICreateBlog {
  title: string;
  content: string;
  coverImage?: string;
  isPublished?: boolean;
}

export interface IUpdateBlog {
  title?: string;
  content?: string;
  coverImage?: string;
  isPublished?: boolean;
  publishedAt?: Date | null;
}

export interface ICreateComment {
  content: string;
  ideaId: string;
  parentId?: string;
}

export interface IUpdateComment {
  content?: string;
  isDeleted?: boolean;
}

export interface ICreateIdea {
  title: string;
  slug: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  images?: string[];
  accessType?: IdeaAccessType;
  price?: number | null;
  categoryId: string;
}

export interface IUpdateIdea {
  title?: string;
  slug?: string;
  problemStatement?: string;
  proposedSolution?: string;
  description?: string;
  images?: string[];
  status?: IdeaStatus;
  accessType?: IdeaAccessType;
  rejectionFeedback?: string;
  price?: number;
  publishedAt?: Date;
  categoryId?: string;
}

export interface ICreateVote {
  type: VoteType;
  ideaId: string;
}

export interface IUpdateVote {
  type: VoteType;
}

export interface ICreateWatchlist {
  ideaId: string;
}
