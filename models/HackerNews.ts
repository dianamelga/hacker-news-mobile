export interface Article {
    objectID: string;
    title: string;
    url: string;
    author: string;
    created_at: string; // ISO string (can be converted to a Date if needed)
    points: number;
    story_text: string | null;
    comment_text: string | null;
    num_comments: number;
}

export interface HackerNewsResponse {
    hits: Article[];
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
    exhaustiveNbHits: boolean;
    query: string;
    params: string;
}
