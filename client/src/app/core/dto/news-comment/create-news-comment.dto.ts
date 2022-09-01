export class CreateNewsCommentDto {
  fromUser: string;
  newsId: string;
  comment: string;

  constructor(fromUser: string, newsId: string, comment: string) {
    this.fromUser = fromUser;
    this.newsId = newsId;
    this.comment = comment;
  }
}
