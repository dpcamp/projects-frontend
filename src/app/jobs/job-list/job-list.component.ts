import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService, InvoiceService } from '../../shared/services/';
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
    private jobFilter = new JobFilter();
    descSort = ClrDatagridSortOrder.DESC;
    lgOpen: boolean = false;
    jobOpen: boolean = false;

    getJobs(){
        this.jobService.getJobs()
        .subscribe(jobs => {
            this.jobs = jobs.data;
            console.log(jobs)
            //  this.totalBudget = jobs.data.map(a => a.budget);

            // console.log(this.totalBudget.reduce((a, b) => a + b));
            });
    }

    constructor(
    private jobService: JobService, 
    private invService: InvoiceService,
    ) { }
    ngOnInit() {

        this.getJobs()

    }
    createJob()
    {
        this.jobService.createJob(this.newJob)
        .subscribe(n => {
            console.log(n)
            this.getJobs()
        })
    }
    createInv()
    {
        this.invService.newInv(this.newInv)
        .subscribe(ninvs => {
           console.log(ninvs)
        })
        this.jobService.updateJob({ 
            proj_id: this.selectedJob.proj_id,
            //balance: this.newBalance,
            //bud_committed: this.newCommitted
         })
         .subscribe(newJob => {
             console.log(this.newBalance)
             console.log(newJob)
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
/*    
    getJobBud()
    {
        this.jobService.getSingle(this.newInv.proj_id)
        .subscribe(job => {
            this.selectedJob = job.data
            this.newBalance = (this.selectedJob.balance - this.newInv.appr_amount)
            this.newCommitted = +this.selectedJob.bud_committed + +this.newInv.appr_amount
           console.log(`balance is ${this.selectedJob.balance}`)
           console.log(`Approved amount is ${this.newInv.appr_amount}`)
           this.postJobBud()
           
        })
    }
    postJobBud()
    {
        console.log(`newBalance: ${this.newBalance}`)
    }
*/
}
