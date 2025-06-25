export interface Feed {
  url: string;
  image: string;
  title: string;
  description: string;
  bankId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedsResponse {
  data: Feed[];
  total: number;
  limit: number;
  page: number;
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
}
