import { ApiProperty } from "@nestjs/swagger";

export class FileElementResponse {
	@ApiProperty({
		description: 'File url',
		example: ''
	})
	url: string;

	@ApiProperty({
		description: 'File name',
		example: 'test'
	})
	name: string;
}