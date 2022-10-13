import { ApiProperty } from "@nestjs/swagger";

export class UpdateAvatarDto {
    @ApiProperty({
		description: 'Account avatar image',
		example: ''
	})
    avatarImg: string;

    constructor(avatarImg: string) {
        this.avatarImg = avatarImg;
    }
}