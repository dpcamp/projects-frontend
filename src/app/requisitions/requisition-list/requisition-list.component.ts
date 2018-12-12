import { Component, OnInit, ViewChild} from '@angular/core';
import { Requisition, Job } from '../../shared/models';
import { RequisitionService, JobService} from '../../shared/services';
import { ClrWizard } from '@clr/angular';



@Component({
    selector: 'app-requisition-list',
    templateUrl: 'requisition-list.component.html'
})

export class RequisitionListComponent implements OnInit{
  reqs: Requisition[];
  editReq = Requisition; 
  @ViewChild('wizardlg') wizardLarge: ClrWizard;
  editReqOpen: boolean = false;
  yearList: any[]
  



constructor(
    private rqsSvc: RequisitionService,
    private jbSvc: JobService
  
  ){ }
  
  ngOnInit(){
    this.rqsSvc.getReqs()
    .subscribe(res => 
        {
            this.reqs = res.data
            //console.log(this.invs)
        }
    )
    }
    editReqWiz(req: any) {
        this.yearList = this.jbSvc.getYears();    
        this.editReqOpen = !this.editReqOpen;
        this.editReq = req;

    }
    updateReq() {
        console.log(this.editReq)
    }
}