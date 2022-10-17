import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateInformationDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Account fullname',
		example: 'admin'
	})
	fullname: string;

    @IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Account description',
		example: 'description'
	})
	about: string;

    constructor(fullname: string, about: string) {
        this.fullname = fullname;
        this.about = about;
    }
}