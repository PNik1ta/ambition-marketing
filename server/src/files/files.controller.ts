import { AtGuard } from './../shared/guards/at.guard';
import { Controller, HttpCode, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MFile } from './mFile.class';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
	constructor(
		private readonly filesService: FilesService
	) { }

	@Post('upload')
	@HttpCode(200)
	@UseGuards(AtGuard)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [new MFile(file)];

		if (file.mimetype.includes('image')) {
			const buffer = await this.filesService.convertToWebP(file.buffer);
			saveArray.push(new MFile({
				originalname: `${file.originalname.split('.')[0]}.webp`,
				buffer
			}));
		}

		return this.filesService.saveFiles(saveArray);
	}

	@Post('upload-multiple')
	@HttpCode(200)
	@UseGuards(AtGuard)
	@UseInterceptors(FilesInterceptor('files'))
	async uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [];

		for(let file of files) {
			saveArray.push(new MFile(file));

			if (file.mimetype.includes('image')) {
				const buffer = await this.filesService.convertToWebP(file.buffer);
				saveArray.push(new MFile({
					originalname: `${file.originalname.split('.')[0]}.webp`,
					buffer
				}));
			}
		}
		

		return this.filesService.saveFiles(saveArray);
	}


}
