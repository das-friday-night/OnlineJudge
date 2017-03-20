import { Pipe, PipeTransform } from '@angular/core';
import {Problem} from "../problems/problem.model";

@Pipe({
  name: 'problemListFilter'
})
export class ProblemListFilterPipe implements PipeTransform {

  transform(problems: Problem[], filterWord?: string): Problem[] {
    return problems.filter(
      problem => {
        // let x = problem.name.toLowerCase().includes(filterWord);
        // console.log(x);
        // return x;
        return problem.name.toLowerCase().includes(filterWord)
      }
    );
  }

}
