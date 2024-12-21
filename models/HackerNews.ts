export interface Article {
    objectID: string;
    story_id: string;
    story_title: string;
    url: string;
    author: string;
    created_at: string; // ISO string (can be converted to a Date if needed)
    story_text: string | null;
    comment_text: string | null;
    num_comments: number;
    is_favorite: boolean; // TODO: create domain object
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
