import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email, emailValid()]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.form.controls.email !== '' && this.form.controls.password !== ''){
      this.auth.login(this.form.value);
    }

  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched;
  }

}

function emailValid() {
  return control => {
// tslint:disable-next-line: max-line-length
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(control.value) ? null : {invalidEmail: true};
  };
}
