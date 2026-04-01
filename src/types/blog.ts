export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  coverImage?: File | string;
  isPublished?: boolean;
}

export interface UpdateBlogPayload {
  title?: string;
  content?: string;
  coverImage?: File | string;
  isPublished?: boolean;
}
