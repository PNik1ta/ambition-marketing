export class UpdateLikesDto {
    likesCount: number;

    constructor(likesCount: number) {
        this.likesCount = likesCount;
    }
}