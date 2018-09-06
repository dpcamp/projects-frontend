import { Component, OnInit } from '@angular/core';
import { JobService } from '../../shared/services/';
import { Job, Invoice, Requisition } from '../../shared/models/';
import {ClrDatagridStringFilterInterface, ClrDatagridSortOrder} from '@clr/angular';


class JobFilter implements ClrDatagridStringFilterInterface<Job> {
    accepts(job: Job, search: string): boolean {
        return job.job_num.toLowerCase().indexOf(search) >= 0;
    }
}

@Component({
    selector: 'app-job-list',
    templateUrl: 'job-list.component.html',
    styleUrls: ['job-list.component.scss']

})

export class JobListComponent implements OnInit {
    jobs: Job[];
    selectedJob: Job;
    reqs: Requisition[];
    invs: Invoice[];
    private jobFilter = new JobFilter();
    descSort = ClrDatagridSortOrder.DESC;

    constructor(
    private jobService: JobService
    ) { }
    ngOnInit() {

        this.jobService.getJobs()
        .subscribe(jobs => this.jobs = jobs.data);
    }

}
