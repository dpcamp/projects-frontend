import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import  {Subscription } from 'rxjs';
import { JobService, InvoiceService, AuthService } from '../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Job, Project, Invoice, AuthUser, User } from '../../shared/models';
import { ClrDatagridStringFilterInterface, ClrWizard } from '@clr/angular';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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

export class JobSingleComponent implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild('invWizard') wizardLarge: ClrWizard;
    @ViewChild('editInvWizard') editInvWizard: ClrWizard;
    @ViewChild('editJobWizard') editJobWizard: ClrWizard;
    //@Input() logUser;
    job: Job;
    project: Project
    private jobFilter = new JobFilter();
    invOpen: boolean = false;
    editInvOpen: boolean = false;
    editJobOpen: boolean = false;
    delModal: boolean = false;
    selectedInv: Invoice = {};
    newInv: Invoice = {};
    _selected: any[] = [];
    deletedInv: Invoice;
    editInv: Invoice;
    subscription: Subscription;
    logUser: string;

        get selected() {
        return this._selected;
    }

    set selected(selection: any[]) {
        this._selected = selection;
        this.cleanUp();
    }

    cleanUp(): void {
        this.deleteInv = null;
        this.editInv = null;
    }
    getJob()
    {
        console.log('getjob')
        this.subscription = this.authService.authUser$
        .subscribe(
            un => {
                 this.logUser = un
                 console.log(`THIS IS ${this.logUser}`)
            })
        const id = this.route.snapshot.params['job_num'];

        this.jobService.getSingle(id)
        .subscribe(job => {
            this.job = job.data;
            console.log(job);
        });
        this.jobService.getBudget(id)
        .subscribe(project => {
            this.project = project.data
            console.log(project);
                })
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    private jobService: JobService,
    private invService: InvoiceService,
    private authService: AuthService
    ) { }
    ngOnInit() {
        this.getJob()
        
    }
    ngAfterViewInit()
    {
        console.log(this.logUser)
        this.subscription = this.authService.authUser$
        .subscribe(
            un => {
                 this.logUser = un
                 console.log(`THIS IS ${this.logUser}`)
            }
        )
    }
    openWizard() {
        this.getCurrentUser()
        this.invOpen = !this.invOpen;
        console.log(this.logUser)
    }
    getCurrentUser() {
        this.subscription = this.authService.authUser$
        .subscribe(
            un => {
                 this.logUser = un
                 console.log(`THIS IS ${this.logUser}`)
            }
        )
    }
    editInvWiz(inv: any) {
            //this.getCurrentUser()
            this.editInvOpen = !this.editInvOpen;
            this.editInv = inv;
            console.log(inv)
            console.log(this.editInv)

    }
    editJobWiz() {

        this.editJobOpen = !this.editJobOpen;


}
    createInv()
    {
        this.newInv.proj_id = this.job.proj_id
        this.newInv.is_paid = false
        this.newInv.created_by = this.logUser
        if (!this.newInv.is_change_order){
            this.newInv.is_change_order = false
        }
        this.invService.newInv(this.newInv)
        .subscribe(ninvs => {
           console.log(ninvs)
           this.getJob()
        })
        
        }
    confirmInv(inv: any){
        this.deletedInv = inv
        this.delModal = !this.delModal
    }
    deleteInv()
    {
        this.invService.deleteInv(this.deletedInv.id)
        .subscribe(dinvs => {
           console.log(dinvs)
           this.getJob()
           this.delModal = false
        })
        }
    updateInv()
    {
        
        this.editInv.updated_by = this.logUser
        this.invService.updateInv(this.editInv)
        .subscribe(einvs => {
            console.log(einvs)
            this.getJob()
        })
        this.cleanUp
        }
        updateJob()
        {
            this.job.updated_by = this.logUser
            this.jobService.updateJob(this.job)
            .subscribe(uJob => {
                console.log(uJob)
                this.getJob()
            })
            }
            concatProjID() {
                if (this.job.job_num && this.job.mutual) {
                this.job.proj_id = `${this.job.job_num}-${this.job.mutual}`
                }
              }
        ngOnDestroy() {
            // prevent memory leak when component destroyed
            this.subscription.unsubscribe();
          }

}
