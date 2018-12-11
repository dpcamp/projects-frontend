import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import  {Subscription } from 'rxjs';
import { JobService, InvoiceService, AuthService, RequisitionService } from '../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Job, Requisition, Project, Invoice, AuthUser, User } from '../../shared/models';
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
    templateUrl: 'job-single.component.html'

})

export class JobSingleComponent implements OnInit{
    @ViewChild('invWizard') wizardLarge: ClrWizard;
    @ViewChild('editInvWizard') editInvWizard: ClrWizard;
    @ViewChild('editJobWizard') editJobWizard: ClrWizard;
    job: Job;
    project: Project
    private jobFilter = new JobFilter();
    invOpen: boolean = false;
    editInvOpen: boolean = false;
    editJobOpen: boolean = false;
    delModal: boolean = false;
    reqModal: boolean = false;
    selectedInv: Invoice = {};
    selectedReq: Requisition = {};
    newInv: Invoice = {};
    _selected: any[] = [];
    deletedInv: Invoice;
    editInv: Invoice;
    subscription: Subscription;
    logUser: string = localStorage.getItem('username');
    streamUser: string;
    routeUser: string;

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
        const id = this.route.snapshot.params['job_num'];
        const year = this.route.snapshot.queryParams['year']
        this.jobService.getSingle(id,year)
        .subscribe(job => {
            this.job = job.data;
        });
        this.jobService.getBudget(id,year)
        .subscribe(project => {
            this.project = project.data
                })
    }

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private invService: InvoiceService,
    public authService: AuthService,
    public reqsService: RequisitionService
    ) { }
    ngOnInit() {
        this.getJob()


    }
    openWizard() {
        this.invOpen = !this.invOpen;
    }
    editInvWiz(inv: any) {
            
        this.editInvOpen = !this.editInvOpen;
        this.editInv = inv;

    }

    editJobWiz() {

        this.editJobOpen = !this.editJobOpen;


}
    createInv()
    {
        this.newInv.proj_id = this.job.id
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
    openReqModal(reqs: any){
    this.reqModal = !this.reqModal
    this.selectedReq = reqs
        }
    setReqYear(reqs: any){
        this.selectedReq = reqs
        this.selectedReq.budget_year = this.job.year
        this.reqsService.updateReq(this.selectedReq)
        .subscribe(ureq => ureq)
    }
    changeReqYear(){
        
        this.reqsService.updateReq(this.selectedReq)
        .subscribe(ureq => {
            this.getJob()
            this.reqModal = false
        })
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
            this.getJob()
        })
        this.cleanUp
        }
        updateJob()
        {
            this.job.updated_by = this.logUser
            this.jobService.updateJob(this.job)
            .subscribe(uJob => {
                this.getJob()
            })
            }
            concatProjID() {
                if (this.job.job_num && this.job.mutual) {
                this.job.proj_id = `${this.job.job_num}-${this.job.mutual}`
                }
              }
    
}
