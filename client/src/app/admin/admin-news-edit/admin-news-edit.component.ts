import { BaseResponse } from './../../core/models/BaseResponse';
import { MaterialService } from './../../core/services/material.service';
import { FileService } from './../../core/services/file.service';
import { UpdateNewsDto } from './../../core/dto/news/update-news.dto';
import { INews } from './../../core/models/INews';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsService } from './../../core/services/news.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { IFileElementResponse } from 'src/app/core/models/IFileElement.response';

@Component({
  selector: 'app-admin-news-edit',
  templateUrl: './admin-news-edit.component.html',
  styleUrls: ['./admin-news-edit.component.scss']
})
export class AdminNewsEditComponent implements OnInit {

  @ViewChild('input') inputRef!: ElementRef;
	image?: File;
	imagePreview?: string | ArrayBuffer | null;
	changeForm: FormGroup;
	news$!: Observable<INews>;

  get Title() { return this.changeForm.get('title'); }

  get Text() { return this.changeForm.get('text'); }

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private fileService: FileService,
    private router: Router
  ) {
    this.changeForm = new FormGroup({
			title: new FormControl(null, [Validators.required]),
			text: new FormControl(null, [Validators.required]),
		});
  }

  ngOnInit(): void {
  }

  triggerClick(): void {
		this.inputRef.nativeElement.click();
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

  changeNews(): void {
    this.changeForm.disable();
		this.news$ = this.route.params
			.pipe(switchMap((params: Params) => {
				return this.newsService.findById(params['id'])
			}));

    this.news$.subscribe(currentNews => {
      if(this.image) {
        this.fileService.upload(this.image!).subscribe((res: IFileElementResponse[]) => {
          let previewImgUrl: string = res[0].url;
          let dto: UpdateNewsDto = new UpdateNewsDto(this.Title?.value, this.Text?.value, previewImgUrl);

          this.newsService.update(currentNews._id!, dto).subscribe((res: BaseResponse<INews>) => {
            MaterialService.toast(res.message);
            this.router.navigate(['/admin/main/news']);
          });
        });
      } else {
        let dto: UpdateNewsDto = new UpdateNewsDto(this.Title?.value, this.Text?.value);

          this.newsService.update(currentNews._id!, dto).subscribe((res: BaseResponse<INews>) => {
            MaterialService.toast(res.message);
            this.router.navigate(['/admin/main/news']);
          });
      }

    })
  }
}
