import { MaterialService } from 'src/app/core/services/material.service';
import { INews } from './../../core/models/INews';
import { BaseResponse } from './../../core/models/BaseResponse';
import { IFileElementResponse } from './../../core/models/IFileElement.response';
import { FileService } from './../../core/services/file.service';
import { CreateNewsDto } from './../../core/dto/news/create-news.dto';
import { Router } from '@angular/router';
import { NewsService } from './../../core/services/news.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-news-add',
  templateUrl: './admin-news-add.component.html',
  styleUrls: ['./admin-news-add.component.scss']
})
export class AdminNewsAddComponent {
	@ViewChild('input') inputRef!: ElementRef;
	image?: File;
	imagePreview?: string | ArrayBuffer | null;
	addForm: FormGroup;

  get Title() { return this.addForm.get('title'); }

  get Text() { return this.addForm.get('text'); }

  constructor(
    private newsService: NewsService,
    private fileService: FileService,
    private router: Router
  ) {
    this.addForm = new FormGroup({
			title: new FormControl(null, [Validators.required]),
			text: new FormControl(null, [Validators.required])
		});
  }

  triggerClick(): void {
		this.inputRef.nativeElement.click();
	}

  addCompleted(): void {
    this.addForm.reset();
    this.addForm.enable();
  }

	onFileUpload(event: any): void {
		const file = event.target.files[0];
		this.image = file;

		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result;
		}

		reader.readAsDataURL(file);
	}

  addNews(): void {
    this.addForm.disable();
    this.fileService.upload(this.image!).subscribe((res: IFileElementResponse[]) => {
      let previewImgUrl: string = res[0].url;
      let dto: CreateNewsDto = new CreateNewsDto(this.Title?.value, previewImgUrl, this.Text?.value);

      this.newsService.create(dto).subscribe(
        (res: BaseResponse<INews>) => {
          MaterialService.toast(res.message);
          this.router.navigate(['/admin/main/news']);
        },

        error => {
          MaterialService.toast(error);
        },

        () => {
          this.addCompleted();
        }
      );
    })

  }
}
