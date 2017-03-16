import { Component, OnInit } from '@angular/core';
import {CollaborationService} from "../../services/collaboration.service";

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
  aceLangName = {
    'Java': 'java',
    'C++': 'c_cpp',
    'Python': 'python'
  }

  editor: any;
  lang: string = "Java";

  constructor(private collaboration: CollaborationService) { }

  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/xcode");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    this.collaboration.init();
  }

  resetEditor() {
    this.editor.getSession().setMode("ace/mode/"+this.aceLangName[this.lang]);
    this.editor.setValue(this.defaultContent[this.lang]);
  }

  setLanguage() {
    this.resetEditor();
  }

  submit(){
    let user_code = this.editor.getValue();
    console.log(user_code);
  }

}
