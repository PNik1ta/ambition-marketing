import { RegisterDto } from './../../core/dto/register.dto';
import { BaseResponse } from './../../core/models/BaseResponse';
import { AccountService } from './../../core/services/account.service';
import { MaterialInstance, MaterialService } from './../../core/services/material.service';
import { IAccount } from './../../core/models/IAccount';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMasseuse } from 'src/app/core/models/IMasseuse';
import { MasseuseService } from 'src/app/core/services/masseuse.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent implements OnInit, AfterViewInit {

  accounts$: Observable<IAccount[]>;

  @ViewChild('addModal') addModalRef!: ElementRef;
  @ViewChild('roleSelect') roleSelectRef!: ElementRef;
  @ViewChild('masseuseSelect') masseuseSelectRef!: ElementRef;

  addModal!: MaterialInstance;
  roleSelect!: MaterialInstance;
  masseuseSelect!: MaterialInstance;
  email: string;

  isMasseuse: boolean;

  addForm: FormGroup;

  masseuses: IMasseuse[];

  get Email() { return this.addForm.get('email') }

  get Password() { return this.addForm.get('password') }

  get Username() { return this.addForm.get('username') }

  get Role() { return this.addForm.get('role') }

  get Masseuse() { return this.addForm.get('masseuse'); }

  constructor(
    private accountService: AccountService,
    private masseuseService: MasseuseService
  ) {
    this.addForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      username: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      masseuse: new FormControl('')
    });

    this.email = localStorage.getItem('email') ?? '';

    this.accounts$ = new Observable();

    this.isMasseuse = false;

    this.masseuses = [];
  }

  ngAfterViewInit(): void {
    this.addModal = MaterialService.initModal(this.addModalRef);
    this.roleSelect = MaterialService.initSelect(this.roleSelectRef);

    setTimeout(() => {
      this.masseuseSelect = MaterialService.initSelect(this.masseuseSelectRef);
    }, 1000);

  }

  ngOnInit(): void {
    this.getAccounts();
    this.getMasseuses();
  }

  removeAccount(email: string): void {
    if(email === this.email) {
      MaterialService.toast("You can't delete thyself");
      return;
    }
    
    this.accountService.delete(email).subscribe((res: BaseResponse<IAccount>) => {
      MaterialService.toast(res.message);
      this.getAccounts();
    });
  }

  getAccounts(): void {
    this.accounts$ = this.accountService.findAll();
  }

  getMasseuses(): void {
    this.masseuseService.findAll().subscribe((res: IMasseuse[]) => {
      this.masseuses = res;
    });
  }

  openAddModal(): void {
		this.addModal.open!();
	}

	closeAddModal(): void {
		this.addModal.close!();
	}

  selectionChange(): void {
    if(this.Role?.value === 'masseuse') {
      this.isMasseuse = true;
    }

    else {
      this.isMasseuse = false;
    }
  }

  addAccount(): void {
    this.addForm.disable();

    const registerDto = new RegisterDto(this.Email?.value, this.Password?.value, this.Username?.value, this.Role?.value, this.Masseuse?.value);

    this.accountService.create(registerDto).subscribe((res: BaseResponse<IAccount>) => {
      MaterialService.toast(res.message);
      this.getAccounts();
    });
  }

}
