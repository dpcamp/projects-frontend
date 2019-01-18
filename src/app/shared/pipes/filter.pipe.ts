import { Pipe, PipeTransform } from '@angular/core';
import {Job } from '../../shared/models/';
import { getTemplateContent } from '@angular/core/src/sanitization/html_sanitizer';
import { retry } from 'rxjs/operators';
@Pipe({
  name: 'jobFilter'
})
export class JobFilterPipe implements PipeTransform {
  transform(jobs: Job[], searchText: string) {
      if(!jobs) return [];
    return jobs.filter(job => job.job_num.indexOf(searchText) !== -1 );
   }
}