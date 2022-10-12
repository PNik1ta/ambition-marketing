import { ApiProperty } from "@nestjs/swagger";

export class UpdateLikesDto {
    @ApiProperty({
		description: 'News likes count',
		example: 0
	})
    likesCount: number;

    constructor(likesCount: number) {
        this.likesCount = likesCount;
    }
}