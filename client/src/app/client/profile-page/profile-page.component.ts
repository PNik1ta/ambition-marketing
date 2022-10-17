import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateAvatarDto } from 'src/app/core/dto/account/update-avatar.dto';
import { UpdateInformationDto } from 'src/app/core/dto/account/update-information.dto';
import { Role } from 'src/app/core/enums/Role';
import { BaseResponse } from 'src/app/core/models/BaseResponse';
import { IAccount } from 'src/app/core/models/IAccount';
import { IFileElementResponse } from 'src/app/core/models/IFileElement.response';
import { IMasseuseComment } from 'src/app/core/models/IMasseuseComment';
import { AccountService } from 'src/app/core/services/account.service';
import { FileService } from 'src/app/core/services/file.service';
import { MasseuseCommentService } from 'src/app/core/services/masseuseComment.service';
import { MaterialInstance, MaterialService } from 'src/app/core/services/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, AfterViewInit {

  email: string;
  account!: IAccount;
  masseuseRole: string;
  isOpened: boolean;

  apiUrl: string;

  rating: number;

  isLoading: boolean;

  comments: IMasseuseComment[];

  accountComments: IMasseuseComment[];

  @ViewChild('input') inputRef!: ElementRef;
  @ViewChild('changeModal') changeModalRef!: ElementRef;

  changeModal!: MaterialInstance;
  form: FormGroup;
  image?: File;

  get Fullname() { return this.form.get('fullname'); }

  get Description() { return this.form.get('description'); }

  constructor(
    private accountService: AccountService,
    private masseuseCommentsService: MasseuseCommentService,
    private fileService: FileService
  ) {
    this.isOpened = false;
    this.email = localStorage.getItem('email')!;
    this.masseuseRole = Role.MASSEUSE;

    this.apiUrl = environment.apiUrl;

    this.rating = 0;

    this.isLoading = true;

    this.comments = [];

    this.accountComments = [];

    this.form = new FormGroup({
      fullname: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getAccount();
    this.getMasseuseComments();
  }

  ngAfterViewInit(): void {
    this.changeModal = MaterialService.initModal(this.changeModalRef);
  }

  triggerClick(): void {
		this.inputRef.nativeElement.click();
	}

  onFileUpload(event: any): void {
		const file = event.target.files[0];
		this.image = file;

    this.fileService.upload(this.image!).subscribe((src: IFileElementResponse[]) => {
      let dto: UpdateAvatarDto = new UpdateAvatarDto(src[0].url);

      this.accountService.updateAvatar(this.email, dto).subscribe((res: BaseResponse<IAccount>) => {
        MaterialService.toast(res.message);
        this.getAccount();
      });
    })
	}

  getAccount(): void {
    this.accountService.findByEmail(this.email).subscribe((res: IAccount) => {
      this.account = res;
      this.isLoading = false;
      this.rating = Math.round(this.account.rating / this.account.ratesCount);
    });
  }

  getMasseuseComments(): void {
    this.masseuseCommentsService.findAll().subscribe((res: IMasseuseComment[]) => {
      this.comments = res;
      this.findMasseuseComments();
    });
  }

  findMasseuseComments(): void {
    for(let comment of this.comments) {
      if ( comment.masseuse === this.account._id ) {
        this.accountComments.push(comment);
      }
    }
  }

  openComments(): void {
    this.isOpened = !this.isOpened;
  }

  closeChangeModal(): void {
    this.changeModal.close!();
  }

  openChangeModal() {
    this.changeModal.open!();
  }

  changeInformation(): void {
    if(this.form.valid) {
      let dto: UpdateInformationDto = new UpdateInformationDto(this.Fullname?.value, this.Description?.value);

      this.accountService.updateInformation(this.email, dto).subscribe((res: BaseResponse<IAccount>) => {
        MaterialService.toast(res.message);
        this.getAccount();
      })
    }

  }

}
