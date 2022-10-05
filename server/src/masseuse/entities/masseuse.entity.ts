import { IMasseuse } from './../../shared/interfaces/IMasseuse';

export class MasseuseEntity implements IMasseuse{
    _id?: string;
    prices: string;
    photos: string[];
    commentsCount: number;
    name: string;
    likesCount: number;
    dislikesCount: number;

    constructor(masseuse: IMasseuse) {
        this._id = masseuse._id;
        this.photos = masseuse.photos;
        this.prices = masseuse.prices;
        this.commentsCount = masseuse.commentsCount;
        this.name = masseuse.name;
    }
}