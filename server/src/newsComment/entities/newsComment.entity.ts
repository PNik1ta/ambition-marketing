import { INewsComment } from '../../shared/interfaces/INewsComment';

export class NewsCommentEntity implements INewsComment{
    _id?: string;
    fromUser: string;
    newsId: string;
    comment: string;
    commentsCount: number;

    constructor(newsComments: INewsComment) {
        this._id = newsComments._id;
        this.comment = newsComments.comment;
        this.fromUser = newsComments.fromUser;
        this.newsId = newsComments.newsId;
        this.commentsCount = newsComments.commentsCount;
    }
}