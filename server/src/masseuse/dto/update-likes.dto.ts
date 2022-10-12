import { ApiProperty } from "@nestjs/swagger";

export class UpdateLikesDto {
    @ApiProperty({
		description: 'Masseuse likes count',
		example: 0
	})
    likesCount: number;
}