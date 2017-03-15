import { Injectable } from '@angular/core';

declare var io: any; // import socket io

@Injectable()
export class CollaborationService {
  collaborationbSocket: any;
  constructor() { }

  init(){
    // setup socket and send msg
    this.collaborationbSocket = io(window.location.origin, {query: 'msg=' + '123'});

    // receive msg
    this.collaborationbSocket.on('message', (msg)=>{
      console.log(msg);
    });
  }

}
