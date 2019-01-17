import { Pipe, PipeTransform } from '@angular/core';
import {Requisition } from '../models';
import { getTemplateContent } from '@angular/core/src/sanitization/html_sanitizer';
import { retry } from 'rxjs/operators';
@Pipe({
  name: 'reqFilter'
})
export class ReqFilterPipe implements PipeTransform {
  transform(rqs: Requisition[], searchText: string) {
      if(!rqs) return [];
    return rqs.filter(r => r.req_num.indexOf(searchText) !== -1 );
   }
}