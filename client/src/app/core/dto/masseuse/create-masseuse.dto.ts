export class CreateMasseuseDto {
  prices: string;
  photos: string[];
  userId: string;

  constructor(prices: string, photos: string[], userId: string) {
    this.prices = prices;
    this.photos = photos;
    this.userId = userId;
  }
}
