import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreateMassageDto } from 'src/app/core/dto/massage/create-massage.dto';
import { CreateMasseuseDto } from 'src/app/core/dto/masseuse/create-masseuse.dto';
import { BaseResponse } from 'src/app/core/models/BaseResponse';
import { IFileElementResponse } from 'src/app/core/models/IFileElement.response';
import { IMasseuse } from 'src/app/core/models/IMasseuse';
import { FileService } from 'src/app/core/services/file.service';
import { MasseuseService } from 'src/app/core/services/masseuse.service';
import { MaterialInstance, MaterialService } from 'src/app/core/services/material.service';

@Component({
  selector: 'app-admin-masseuses',
  templateUrl: './admin-masseuses.component.html',
  styleUrls: ['./admin-masseuses.component.scss']
})
export class AdminMasseusesComponent implements OnInit, AfterViewInit {

  masseuses: IMasseuse[];

  @ViewChild('addModal') addModalRef!: ElementRef;

  addModal!: MaterialInstance;

  form: FormGroup;

  files: File[];

  isLoading: boolean;

  get Prices() { return this.form.get('prices'); }

  get Photos() { return this.form.get('photos'); }

  get Name() { return this.form.get('name'); }

  constructor(
    private masseuseService: MasseuseService,
    private fileService: FileService
  ) {
    this.masseuses = [];

    this.form = new FormGroup({
      prices: new FormControl('', Validators.required),
      photos: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });

    this.isLoading = false;
    this.files = [];
  }

  ngOnInit(): void {
    this.getMasseuses();
  }

  ngAfterViewInit(): void {
    this.addModal = MaterialService.initModal(this.addModalRef);
  }

  openAddModal(): void {
		this.addModal.open!();
	}

	closeAddModal(): void {
		this.addModal.close!();
	}

  getMasseuses(): void {
    this.isLoading = true;
    this.masseuseService.findAll().subscribe((res: IMasseuse[]) => {
      this.masseuses = res;
      this.isLoading = false;
    });
  }

  removeMasseuse(id: string): void {
    this.masseuseService.delete(id).subscribe((res: BaseResponse<IMasseuse>) => {
      MaterialService.toast(res.message);
      this.getMasseuses();
    });
  }

  handleClick() {
    document.getElementById('upload-file')!.click();
  }

  addAttachment(fileInput: any) {
    if (fileInput.target.files.length !== 0) {
      const fileName = fileInput.target.files;

      if (fileName) {
        for(let i = 0; i < fileName.length; i++) {
          (document.getElementById('file-text')! as HTMLInputElement).value += `${fileName[i].name}, `;
        }
      }

      for(let i = 0; i < this.getFiles()!.length; i++) {
        this.files.push(this.getFiles()![i]);
      }
    }
  }

  getFiles() {
    return (document.getElementById('upload-file')! as HTMLInputElement).files;
  }

  addMasseuse(): void {
    if(this.form.valid) {
      this.isLoading = true;
      this.fileService.uploadMultiple(this.files).subscribe((res: IFileElementResponse[]) => {
        const photos: string[] = [];

        for(let file of res) {
          if(file.name.endsWith('.webp')) {
            photos.push(file.url);
          }
        }

        let dto: CreateMasseuseDto = new CreateMasseuseDto(this.Prices?.value, photos, this.Name?.value);

        this.masseuseService.create(dto).subscribe((res: BaseResponse<IMasseuse>) => {
          MaterialService.toast(res.message);
          this.isLoading = false;
          this.getMasseuses();
        });
      });
    }

  }
}
