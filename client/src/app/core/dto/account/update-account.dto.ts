export class UpdateAccountDto {
	username: string;
	avatarImg: string;
	about: string;
	age: number;

  constructor(username: string, avatarImg: string, about: string, age: number) {
    this.username= username;
    this.avatarImg = avatarImg;
    this.about = about;
    this.age = age;
  }
}
