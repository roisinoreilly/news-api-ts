export type Topic = {
    description: string;
    slug: string;
}

export type Article = {
    article_id: number;
    title: string;
    topic: string;
    author: string;
    body: string;
    created_at: Date;
    votes: number;
    comment_count: number;
}

export interface ResponseError extends Error {
    status?: number;
    code?: string;
    msg?: string;
  }