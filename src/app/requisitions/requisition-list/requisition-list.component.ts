import { Component, OnInit, ViewChild} from '@angular/core';
import { Requisition } from '../../shared/models';
import { RequisitionService} from '../../shared/services';
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
  



constructor(
    private rqsSvc: RequisitionService
  
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
            
        this.editReqOpen = !this.editReqOpen;
        this.editReq = req;

    }
    updateReq() {
        console.log(this.editReq)
    }
}