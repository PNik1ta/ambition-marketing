import { ApiProperty } from "@nestjs/swagger";

export class UpdateLikedNewsDto {
    @ApiProperty({
		description: 'Account news id',
		example: ''
	})
    newsId: string;
    
    constructor(newsId: string) {
        this.newsId = newsId;
    }
}