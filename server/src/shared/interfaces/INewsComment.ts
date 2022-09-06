export interface INewsComment {
    _id?: string;
    fromUser: string;
    newsId: string;
    comment: string;
    commentsCount: number;
}