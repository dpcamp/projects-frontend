import { Pipe, PipeTransform } from '@angular/core';
import {Invoice } from '../models';
import { getTemplateContent } from '@angular/core/src/sanitization/html_sanitizer';
import { retry } from 'rxjs/operators';
@Pipe({
  name: 'invFilter'
})
export class InvFilterPipe implements PipeTransform {
  transform(inv: Invoice[], searchText: string) {
      if(!inv) return [];
    return inv.filter(r => r.inv_num.indexOf(searchText) !== -1 );
   }
}