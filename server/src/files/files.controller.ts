import { AtGuard } from './../shared/guards/at.guard';
import { Controller, HttpCode, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MFile } from './mFile.class';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('files')
@ApiBearerAuth('JWT-auth')
export class FilesController {
	constructor(
		private readonly filesService: FilesService
	) { }

	@Post('upload')
	@HttpCode(200)
	@UseGuards(AtGuard)
	@UseInterceptors(FileInterceptor('files'))
	@ApiBearerAuth('JWT-auth')
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [new MFile(file)];

		return this.filesService.saveFiles(saveArray);
	}

	@Post('upload-multiple')
	@HttpCode(200)
	@UseGuards(AtGuard)
	@UseInterceptors(FilesInterceptor('files'))
	@ApiBearerAuth('JWT-auth')
	async uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [];

		for(let file of files) {
			saveArray.push(new MFile(file));
		}

		return this.filesService.saveFiles(saveArray);
	}


}
