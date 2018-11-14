import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService, InvoiceService } from '../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Job, Project, Invoice } from '../../shared/models';
import { ClrDatagridStringFilterInterface, ClrWizard } from '@clr/angular';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';

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
    @ViewChild('invWizard') wizardLarge: ClrWizard;
    @ViewChild('editInvWizard') editInvWizard: ClrWizard;
    job: Job;
    project: Project
    private jobFilter = new JobFilter();
    invOpen: boolean = false;
    editInvOpen: boolean = false;
    selectedInv: Invoice = {};
    newInv: Invoice = {};
    _selected: any[] = [];
    deletedInv: Invoice;
    editInv: Invoice;
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
    private invService: InvoiceService
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
            console.log(inv)
            console.log(this.editInv)

    }
    createInv()
    {
        this.newInv.proj_id = this.job.proj_id
        this.newInv.is_paid = false
        if (!this.newInv.is_change_order){
            this.newInv.is_change_order = false
        }
        this.invService.newInv(this.newInv)
        .subscribe(ninvs => {
           console.log(ninvs)
           this.getJob()
        })
        
        }
    deleteInv(inv: any)
    {
        this.deletedInv = inv
        this.invService.deleteInv(this.deletedInv.id)
        .subscribe(dinvs => {
           console.log(dinvs)
           this.getJob()
        })
        }
    updateInv()
    {
        this.invService.updateInv(this.editInv)
        .subscribe(einvs => {
            console.log(einvs)
            this.getJob()
        })
        this.cleanUp
        }

}
