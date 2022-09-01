export class UpdateMasseuseDto {
  prices: string;
  photos: string[];

  constructor(prices: string, photos: string[]) {
    this.prices = prices;
    this.photos = photos;
  }
}
