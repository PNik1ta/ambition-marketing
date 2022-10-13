import { ApiProperty } from "@nestjs/swagger";

export class UpdateRatingDto {
    @ApiProperty({
		description: 'Account rating',
		example: 5
	})
    rating: number;

    constructor(rating: number) {
        this.rating = rating;
    }
}