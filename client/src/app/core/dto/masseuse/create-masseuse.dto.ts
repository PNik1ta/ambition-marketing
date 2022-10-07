export class CreateMasseuseDto {
  prices: string;
  photos: string[];
  name: string;

  constructor(prices: string, photos: string[], name: string) {
    this.prices = prices;
    this.photos = photos;
    this.name = name;
  }
}
