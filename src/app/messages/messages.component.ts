import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

messages = [];

onPosted(message) {
  this.messages.unshift(message);
}

  constructor(private webService: WebService, private route: ActivatedRoute) { }

  async ngOnInit() {
    let res = await this.webService.getMessages();
    this.messages.push(res);
    this.messages = this.messages[0];

    if (this.route.snapshot.params.owner !== undefined) {
      this.filterMessage(this.route.snapshot.params.owner);
    }

  }

  filterMessage(ownerName: string) {
    const newmessages = this.messages.filter((message) => {
      return ownerName.toLowerCase() === message.owner.toLowerCase();
    });

    this.messages = newmessages;
  }

}
