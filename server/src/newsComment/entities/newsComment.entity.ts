import { INewsComments } from '../../shared/interfaces/INewsComments';

export class NewsCommentEntity implements INewsComments{
    _id?: string;
    fromUser: string;
    newsId: string;
    comment: string;
    commentsCount: number;

    constructor(newsComments: INewsComments) {
        this._id = newsComments._id;
        this.comment = newsComments.comment;
        this.fromUser = newsComments.fromUser;
        this.newsId = newsComments.newsId;
        this.commentsCount = newsComments.commentsCount;
    }
}