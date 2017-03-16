import { Injectable } from '@angular/core';

declare var io: any; // import socket io

@Injectable()
export class CollaborationService {
  socket: any;
  constructor() { }

  init(problemID: string){
    // setup socket and send msg
    this.socket = io(window.location.origin, {query: 'problemID=' + problemID});

    // receive test msg
    this.socket.on("message", (msg)=>{
      console.log(msg);
    });

    this.socket.on("change", (delta)=>{
      console.log("rcv change from server: \n" + delta);
    });
  }

  change(delta: string): void{
    this.socket.emit("change", delta);
  }

}
