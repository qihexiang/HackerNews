export type Item = {
    type: "story" | "comment" | "job" | "poll" | "pollopt"
    deleted: boolean;
    title: string;
    url?: string;
    time: number;
    text?: string;
    kids?: number[];
    by: string;
    score: number;
}