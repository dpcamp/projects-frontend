import { Component, OnInit, ViewChild } from '@angular/core';
import  {Subscription } from 'rxjs';
import { JobService, AuthService } from '../../shared/services/';
import { Job, Invoice, Requisition, UserData, UserAccess } from '../../shared/models/';
import {ClrDatagridStringFilterInterface, ClrDatagridSortOrder, ClrWizard, ClrDatagridFilter} from '@clr/angular';
import { Chart } from 'chart.js';
import { PopoverOptions } from '@clr/angular/popover/common/popover-options.interface';
import { ActivatedRoute, Params } from '@angular/router';



class DgJobFilter implements ClrDatagridStringFilterInterface<Job> {
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
    searchText =''
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
    users: UserData[] = [];
    jobFilterDg = new DgJobFilter();
    descSort = ClrDatagridSortOrder.DESC;
    lgOpen: boolean = false;
    jobOpen: boolean = false;
    subscription: Subscription;
    logUser: string = localStorage.getItem('username');
    yearList: any[] = [];
    thisYear: number
    thisMonth: number

    getJobs(){
        const user = this.route.snapshot.queryParams['un']
        if(user)
        {
            this.authService.getUserJobs(user)
            .subscribe(jobs => {
                this.jobs = jobs.data.jobs
                
            })
        } else {
        this.jobService.getJobs()
        .subscribe(jobs => {
            this.jobs = jobs.data;
            });
        }
    }

    constructor(
    private jobService: JobService, 
    public authService: AuthService,
    private route: ActivatedRoute
    ) { }
    ngOnInit() {
            this.route.queryParams.subscribe(queryParams => {
      
      this.getJobs()

    });

        

    }

    createJob()
    {
        
        this.newJob.created_by = this.logUser
        this.jobService.createJob(this.newJob)
        .subscribe(n => {
            
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
        
        this.authService.getUsers()
        
        .subscribe(res => {
            this.users = res.data
            this.users.push({id: null, 
                            name: "Unassigned",
                            username: null, 
                            access_level: null,
                            created_at:null,
                            updated_at:null})
            
             
        })
        if (this.yearList.length == 0){
        this.yearList = this.jobService.getYears();
        
        }
        if (this.jobService.getMonth() == 12){
        this.newJob.year = this.yearList[0]
        } else {
            this.newJob.year = this.yearList[1]
        }
        //this.newJob.assigned_to = this.users[this.users.length - 1].username  
        this.jobOpen =!this.jobOpen;
    }
}
