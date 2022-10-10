export class UpdateLikedNewsDto {
    newsId: string;
    
    constructor(newsId: string) {
        this.newsId = newsId;
    }
}