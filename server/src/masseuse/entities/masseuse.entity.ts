import { IMasseuse } from './../../shared/interfaces/IMasseuse';

export class MasseuseEntity implements IMasseuse{
    _id?: string;
    prices: string;
    photos: string[];
    userId: string;
    commentsCount: number;

    constructor(masseuse: IMasseuse) {
        this._id = masseuse._id;
        this.photos = masseuse.photos;
        this.prices = masseuse.prices;
        this.userId = masseuse.userId;
        this.commentsCount = masseuse.commentsCount;
    }
}