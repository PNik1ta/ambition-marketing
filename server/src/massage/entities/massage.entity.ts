import { IMassage } from "../../shared/interfaces/IMassage";

export class MassageEntity implements IMassage {
    _id?: string;
    name: string;
    description: string;
    previewImg: string;

    constructor(massage: IMassage) {
        this._id = massage._id;
        this.name = massage.name;
        this.description = massage.description;
        this.previewImg = massage.previewImg;
    }
}