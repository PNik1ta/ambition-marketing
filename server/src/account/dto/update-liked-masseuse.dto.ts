import { ApiProperty } from "@nestjs/swagger";

export class UpdateLikedMasseuseDto {
    @ApiProperty({
		description: 'Account masseuse id',
		example: ''
	})
    masseuseId: string; 

    constructor(masseuseId: string) {
        this.masseuseId = masseuseId;
    }
}