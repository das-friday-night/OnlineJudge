import { Component, OnInit } from '@angular/core';
import {CollaborationService} from "../../services/collaboration.service";
import {ActivatedRoute} from "@angular/router";

declare var ace: any; // import ace

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  languages = ["Java", "C++", "Python"];
  defaultContent = {
    'Java': `public class Solution {
    
    public int[] twoSum(int[] numbers, int target) {
        
    }
}`,
    'C++': `#include <iostream>
    using namespace std;
    ​
    int main() {
       // Type your C++ code here
       return 0;
}`,
    'Python': `class Solution:
    def example():
        # Write your Python code here`
  }
  aceModeName = {
    'Java': 'java',
    'C++': 'c_cpp',
    'Python': 'python'
  }

  editor: any;
  lang: string = "Java";

  constructor(private collaboration: CollaborationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/xcode");
    this.resetEditor();
    // avoid bug when editor holds too many chars that out of buffer
    this.editor.$blockScrolling = Infinity;
    this.editor.lastChangeLog = null;

    this.editor.on("change", (e)=>{
      let changeInfo = JSON.stringify(e);
      console.log(changeInfo);
      if(this.editor.lastChangeLog != e){
        this.editor.lastChangeLog = e;
        this.collaboration.change(changeInfo);
      }
    });

    this.route.params.subscribe(params => {
      this.collaboration.init(params['id']);

    });

  }

  resetEditor() {
    this.editor.getSession().setMode("ace/mode/"+this.aceModeName[this.lang]);
    this.editor.setValue(this.defaultContent[this.lang]);
    // move cursor to first line
    this.editor.gotoLine(0);
  }

  setLanguage() {
    this.resetEditor();
  }

  submit(){
    let user_code = this.editor.getValue();
    console.log(user_code);
  }

}
