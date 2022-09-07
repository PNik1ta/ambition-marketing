import { IFileElementResponse } from './../../core/models/IFileElement.response';
import { CreateMassageDto } from './../../core/dto/massage/create-massage.dto';
import { BaseResponse } from './../../core/models/BaseResponse';
import { FileService } from './../../core/services/file.service';
import { MassageService } from './../../core/services/massage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from './../../core/services/material.service';
import { IMassage } from './../../core/models/IMassage';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-massages',
  templateUrl: './admin-massages.component.html',
  styleUrls: ['./admin-massages.component.scss']
})
export class AdminMassagesComponent implements OnInit, AfterViewInit {
  massages$: Observable<IMassage[]>;

  @ViewChild('addModal') addModalRef!: ElementRef;
  @ViewChild('changeModal') changeModalRef!: ElementRef;
  @ViewChild('input') inputRef!: ElementRef;

  addModal!: MaterialInstance;
  changeModal!: MaterialInstance;

  image?: File;
  imagePreview?: string | ArrayBuffer | null;

  addForm: FormGroup;
  changeForm: FormGroup;

  get Name() { return this.addForm.get('name'); }

  get Description() { return this.addForm.get('description'); }

  constructor(
    private massageService: MassageService,
    private fileService: FileService
  ) {
    this.massages$ = new Observable();

    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.changeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getMassages();
  }

  ngAfterViewInit(): void {
    this.addModal = MaterialService.initModal(this.addModalRef);
    this.changeModal = MaterialService.initModal(this.changeModalRef);
  }

  getMassages(): void {
    this.massages$ = this.massageService.findAll();
  }

  openAddModal(): void {
		this.addModal.open!();
	}

	closeAddModal(): void {
		this.addModal.close!();
	}

  openChangeModal(): void {
    this.changeModal.open!();
  }

  closeChangeModal(): void {
    this.changeModal.close!();
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

  deleteMassage(id: string): void {
    this.massageService.delete(id).subscribe((res: BaseResponse<IMassage>) => {
      MaterialService.toast(res.message);
      this.getMassages();
    });
  }

  addMassage(): void {
    this.addForm.disable;

    let imageUrl: string = '';

    this.fileService.upload(this.image!).subscribe((res: IFileElementResponse[]) => {
      imageUrl = res[0].url;
      console.log(res);
      console.log(imageUrl);

      let dto: CreateMassageDto = new CreateMassageDto(this.Name?.value, this.Description?.value, imageUrl);
      this.massageService.create(dto).subscribe((res: BaseResponse<IMassage>) => {
        MaterialService.toast(res.message);
        this.getMassages();
      });
    });



  }
}
