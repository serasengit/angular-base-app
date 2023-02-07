import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNull',
})
export class ReplaceNullPipe implements PipeTransform {
  transform(value: any, replaceText: string = '---'): any {
    if (typeof value === 'undefined' || value === null) {
      return replaceText;
    }
    return value;
  }
}
