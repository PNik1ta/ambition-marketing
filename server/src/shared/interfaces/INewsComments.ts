export interface INewsComments {
    _id?: string;
    fromUser: string;
    newsId: string;
    comment: string;
    commentsCount: number;
}