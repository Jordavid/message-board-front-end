import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(private webService: WebService, private sb: MatSnackBar) {}

  ngOnInit() {
    this.webService.getUser().subscribe(res => {
      this.user.firstName = res.firstName;
      this.user.lastName = res.lastName;
      this.user.email = res.email;
    });
  }

  updateUser() {
    this.webService.saveUser(this.user).subscribe(res => {
      localStorage.removeItem('name');
      localStorage.setItem('name', res.firstName);
      this.sb.open('Profile Successfully Updated', 'close', {duration: 5000});
    });
  }

}
