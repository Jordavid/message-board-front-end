import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  msgs = [];

  constructor(private webService: WebService, private auth: AuthService) {
    this.gMessages();
  }

  ngOnInit() {
    this.webService.getUser().subscribe();
  }

  async gMessages(){
    let res = await this.webService.getMessages();
    this.msgs.push(res);
    this.msgs = this.msgs[0];
  }
}
