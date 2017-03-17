import {Injectable, style} from '@angular/core';
import {COLORS} from "../../assets/colors";

declare var io: any; // import socket io
declare var ace: any;

@Injectable()
export class CollaborationService {
  socket: any;
  collaborators: Object = {};
  collaboratorCount: number = 0;
  constructor() { }

  init(editor: any, problemID: string){
    // setup socket and send msg
    this.socket = io(window.location.origin, {query: 'problemID=' + problemID});

    // receive change from server
    this.socket.on("changeText", (delta: string)=>{
      console.log("rcv change text: \n" + delta);
      delta = JSON.parse(delta);
      editor.lastChangeLog = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.socket.on("changeCursor", (cursor: string)=>{
      console.log("rcv change text: \n" + cursor);
      cursor = JSON.parse(cursor);
      let id = cursor['socketID'];
      if(this.collaborators[id]){
        editor.getSession().removeMarker(this.collaborators[id]['marker']);
      } else {
        this.collaborators[id] = {};
        let styleTag = document.createElement("style");
        styleTag.type = "text/css";
        styleTag.innerHTML = ".editor_cursor_" + id
          + "{position:absolute; background:" + COLORS[this.collaboratorCount%COLORS.length] + ";"
          + "z-index: 100; width:3px !important; }";
        document.body.appendChild(styleTag);
        this.collaboratorCount++;
      }
      let Range = ace.require('ace/range').Range;
      let x = cursor['row'];
      let y = cursor['column'];
      let newMarker = editor.getSession().addMarker(new Range(x, y, x, y + 1), 'editor_cursor_' + id, true);
      this.collaborators[id]['marker'] = newMarker;

    });

    // (test) receive msg
    this.socket.on("message", (msg: string)=>{
      console.log("rcv change text: " + msg);
    });
  }

  // send change to server
  change(changeObj: string, changeInfo: string): void{
    if(changeInfo){
      this.socket.emit(changeObj, changeInfo);
    } else {
      this.socket.emit(changeObj);
    }
  }

}
