import { IMasseuseComment } from './../../shared/interfaces/IMasseuseComment';
export class MasseuseCommentEntity implements IMasseuseComment{

    _id?: string;
    fromUser: string;
    masseuse: string;
    comment: string;

    constructor(masseuseComment: IMasseuseComment) {
        this._id = masseuseComment._id;
        this.comment = masseuseComment.comment;
        this.fromUser = masseuseComment.fromUser;
        this.masseuse = masseuseComment.masseuse;
    }
}