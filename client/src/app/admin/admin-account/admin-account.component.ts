import { RegisterDto } from './../../core/dto/register.dto';
import { BaseResponse } from './../../core/models/BaseResponse';
import { AccountService } from './../../core/services/account.service';
import { MaterialInstance, MaterialService } from './../../core/services/material.service';
import { IAccount } from './../../core/models/IAccount';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent implements OnInit, AfterViewInit {

  accounts$: Observable<IAccount[]>;

  @ViewChild('addModal') addModalRef!: ElementRef;
  @ViewChild('roleSelect') roleSelectRef!: ElementRef;

  addModal!: MaterialInstance;
  roleSelect!: MaterialInstance;

  addForm: FormGroup;

  get Email() { return this.addForm.get('email') }

  get Password() { return this.addForm.get('password') }

  get Username() { return this.addForm.get('username') }

  get Role() { return this.addForm.get('role') }

  constructor(
    private accountService: AccountService
  ) {
    this.addForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      username: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });

    this.accounts$ = new Observable();
  }

  ngAfterViewInit(): void {
    this.addModal = MaterialService.initModal(this.addModalRef);
    this.roleSelect = MaterialService.initSelect(this.roleSelectRef);
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  removeAccount(email: string): void {
    console.log(email);
    this.accountService.delete(email).subscribe((res: BaseResponse<IAccount>) => {
      MaterialService.toast(res.message);
      this.getAccounts();
    });
  }

  getAccounts() {
    this.accounts$ = this.accountService.findAll();
  }

  openAddModal(): void {
		this.addModal.open!();
	}

	closeAddModal(): void {
		this.addModal.close!();
	}

  addAccount(): void {
    this.addForm.disable();

    const registerDto = new RegisterDto(this.Email?.value, this.Password?.value, this.Username?.value, this.Role?.value);

    this.accountService.create(registerDto).subscribe((res: BaseResponse<IAccount>) => {
      MaterialService.toast(res.message);
      this.getAccounts();
    });
  }

}
