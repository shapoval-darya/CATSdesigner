import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { MustMatch } from './MustMatch';
import { questions } from '../questions';
import {AccountService} from '../service/account.service';
import {RegisterModel} from '../model/student';
import {GroupService} from '../service/group.service';
import {MatDialog} from '@angular/material/dialog';
import {SuccessMessageComponent} from '../success-message/success-message.component';
import {ValidateEmailNotTaken} from './ValidateEmailNotTaken';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output() submitEM = new EventEmitter();

  quest = questions;
  form: FormGroup;
  groups: any;
  isLoad = false;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private groupService: GroupService, private dialog: MatDialog,
              private route: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        Username: new FormControl('', [Validators.required, Validators.minLength(6),
          Validators.pattern('^[a-z0-9_.-]{3,30}$')], ValidateEmailNotTaken.createValidator(this.accountService)),
        Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.passwordValidator]),
        ConfirmPassword: new FormControl(''),
        Surname: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        Name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        Patronymic: new FormControl(''),
        GroupId: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
        SecretId: new FormControl(1),
        SecretAnswer: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)])
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    this.getGroups();
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  getGroups() {
    this.groupService.getGroups().subscribe(items => {
      this.groups = items;
      this.isLoad = true;
    });
  }

  private passwordValidator(control: FormControl): ValidationErrors {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasLowercaseLetter = /[a-z]/.test(value);
    const passwordValid = hasNumber && hasCapitalLetter && hasLowercaseLetter;
    if (!passwordValid) {
     return {invalid: 'Password invalid'};
    }
    return null;
   }

  hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }

  register() {
    const resultObject = new RegisterModel();
    const controls = this.form.controls;
    resultObject.Name = controls.Name.value;
    resultObject.Surname = controls.Surname.value;
    resultObject.Patronymic = controls.Patronymic.value;
    resultObject.UserName = controls.Username.value;
    resultObject.Password = controls.Password.value;
    resultObject.ConfirmPassword = controls.ConfirmPassword.value;
    resultObject.Group = controls.GroupId.value;
    resultObject.Answer = controls.SecretAnswer.value;
    resultObject.QuestionId = controls.SecretId.value;
    this.accountService.register(resultObject).subscribe(
      () => {
        this.dialog.open(SuccessMessageComponent, {
          data: 'Пользователь успешно зарегистрирован.',
          position: {
            bottom: '0px',
            right: '0px'
          }
        });
        this.route.navigate(['/login']);
      }, () => {
        this.dialog.open(SuccessMessageComponent, {
          data: 'Пользователь успешно зарегистрирован.',
          position: {
            bottom: '0px',
            right: '0px'
          }
        });
        this.route.navigate(['/login']);
      });
  }
}