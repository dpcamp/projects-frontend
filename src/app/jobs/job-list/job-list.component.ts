import { Component, OnInit, ViewChild } from '@angular/core';
import  {Subscription } from 'rxjs';
import { JobService, InvoiceService, AuthService } from '../../shared/services/';
import { Job, Invoice, Requisition } from '../../shared/models/';
import {ClrDatagridStringFilterInterface, ClrDatagridSortOrder, ClrWizard} from '@clr/angular';
import { Chart } from 'chart.js';


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
    @ViewChild('wizardlg') wizardLarge: ClrWizard;
    @ViewChild('jobWiz') wizardJob: ClrWizard;
    @ViewChild('lineChart') private chartRef;
    chart: any;
    totalBudget: any[];
    jobs: Job[];
    newBalance: number;
    newCommitted: number; 
    selectedJob: Job;
    rqs: Requisition[];
    invs: Invoice[];
    newInv: Invoice = {};
    newJob: Job = {};
    newRqs: Requisition;
    jobFilter = new JobFilter();
    descSort = ClrDatagridSortOrder.DESC;
    lgOpen: boolean = false;
    jobOpen: boolean = false;
    subscription: Subscription;
    logUser: string;

    getJobs(){
        this.jobService.getJobs()
        .subscribe(jobs => {
            this.jobs = jobs.data;
            });
    }

    constructor(
    private jobService: JobService, 
    private invService: InvoiceService,
    private authService: AuthService
    ) { }
    ngOnInit() {

        this.getJobs()
        this.subscription = this.authService.authUser$
        .subscribe(
            un => {
                this.logUser = un
            }
        )

    }
    createJob()
    {
        this.newJob.created_by = this.logUser
        this.jobService.createJob(this.newJob)
        .subscribe(n => {
            console.log(n)
            this.getJobs()
        })
    }
    concatProjID() {
            if (this.newJob.job_num && this.newJob.mutual) {
            this.newJob.proj_id = `${this.newJob.job_num}-${this.newJob.mutual}`
            }
          }
    openWizard() {
        this.lgOpen = !this.lgOpen;
    }
    openJobWizard() {
        
        this.jobOpen =!this.jobOpen;
    }
}
