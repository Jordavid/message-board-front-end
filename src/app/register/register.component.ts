import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = fb.group(
      {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailValid()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: matchingFields('password', 'confirmPassword')
    }
    );
  }

  ngOnInit() {
  }

  onSubmit(){
// tslint:disable-next-line: max-line-length
    if (this.form.controls.firstName !== '' && this.form.controls.lastName !== '' && this.form.controls.email !== '' && this.form.controls.password !== '' && this.form.controls.confirmPassword !== '') {
      this.auth.register(this.form.value);
    }

  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched;
  }

}

function matchingFields(filed1: string, filed2: string) {
  return form => {
    if (form.controls[filed1].value !== form.controls[filed2].value) {
      return {missmatchedFields: true}
    }
  };
}

function emailValid() {
  return control => {
// tslint:disable-next-line: max-line-length
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(control.value) ? null : {invalidEmail: true};
  };
}
