import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebService } from '../web.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

// tslint:disable-next-line: no-output-on-prefix
  @Output() onPosted = new EventEmitter();

  message = {
    owner: this.auth.name,
    body: ''
  };

  constructor(private webService: WebService, private auth: AuthService) { }

  ngOnInit() {
  }

  async sendMessage() {
    const res = await this.webService.postMessages(this.message);
    this.onPosted.emit(res);
    this.message.body = '';
  }

}
