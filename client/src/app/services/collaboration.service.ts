import { Injectable } from '@angular/core';

declare var io: any; // import socket io

@Injectable()
export class CollaborationService {
  socket: any;
  constructor() { }

  init(editor: any, problemID: string){
    // setup socket and send msg
    this.socket = io(window.location.origin, {query: 'problemID=' + problemID});

    // receive change from server
    this.socket.on("change", (delta: string)=>{
      console.log("rcv change: \n" + delta);
      let change = JSON.parse(delta);
      editor.lastChangeLog = change;
      editor.getSession().getDocument().applyDeltas([change]);
    });

    // receive test msg
    this.socket.on("rcv message", (msg: string)=>{
      console.log(msg);
    });
  }

  // send change to server
  change(delta: string): void{
    this.socket.emit("change", delta);
  }

}
