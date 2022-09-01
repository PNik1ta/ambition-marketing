export class CreateNewsDto {
  title: string;
  previewImg: string;
  description: string;

  constructor(title: string, previewImg: string, description: string) {
    this.title = title;
    this.previewImg = previewImg;
    this.description = description;
  }
}
