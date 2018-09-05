import { Component, OnInit } from '@angular/core';
import { JobService } from '../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from '../../shared/models';
import {ClrDatagridStringFilterInterface} from '@clr/angular';


class JobFilter implements ClrDatagridStringFilterInterface<Job> {
    accepts(job: Job, search: string): boolean {
        return job.job_num.toLowerCase().indexOf(search) >= 0;
    }
}

@Component({
    selector: 'app-job-single',
    templateUrl: 'job-single.component.html',
    styleUrls: ['job-single.component.scss']

})

export class JobSingleComponent implements OnInit {
    job: Job;
    private jobFilter = new JobFilter();


    constructor(
        private route: ActivatedRoute,
        private router: Router,
    private jobService: JobService
    ) { }
    ngOnInit() {
        const id = this.route.snapshot.params['job_num'];

        this.jobService.getSingle(id)
        .subscribe(job => {
            this.job = job.data;
            console.log(job);
        });
    }

}
