import { Idea } from "./idea";

export interface WatchlistItem {
  id: string;
  ideaId: string;
  userId: string;
  createdAt: string;
  idea: Idea;
}

export interface WatchlistResponse {
  data: WatchlistItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
