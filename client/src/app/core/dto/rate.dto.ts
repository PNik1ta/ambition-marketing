export class RateDto {
  fromUser: string;
  toUser: string;
  rating: number;

  constructor(fromUser: string, toUser: string, rating: number) {
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.rating = rating;
  }
}
