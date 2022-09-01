export class CreateMasseuseCommentDto {
  fromUser: string;
  masseuse: string;
  comment: string;

  constructor(fromUser: string, masseuse: string, comment: string) {
    this.fromUser = fromUser;
    this.masseuse = masseuse;
    this.comment = comment;
  }
}
