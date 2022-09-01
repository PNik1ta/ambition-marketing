export class CreateMassageDto {
  name: string;
  description: string;
  previewImg: string;

  constructor(name: string, description: string, previewImg: string) {
    this.name = name;
    this.description = description;
    this.previewImg = previewImg;
  }
}
