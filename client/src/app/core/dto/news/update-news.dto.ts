export class UpdateNewsDto {
  title: string;
  previewImg?: string;
  description: string;

  constructor(title: string, description: string, previewImg?: string) {
    this.title = title;
    this.previewImg = previewImg;
    this.description = description;
  }
}
