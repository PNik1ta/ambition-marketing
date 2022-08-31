import { INews } from './../../shared/interfaces/INews';
export class NewsEntity implements INews{
    _id?: string;
    title: string;
    previewImg: string;
    description: string;

    constructor(news: INews) {
        this._id = news._id;
        this.description = news.description;
        this.previewImg = news.previewImg;
        this.title = news.title;
    }
}