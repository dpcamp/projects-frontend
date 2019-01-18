import { Component, OnInit, ViewChild} from '@angular/core';
import { Invoice } from '../../shared/models';
import { InvoiceService} from '../../shared/services';
import { ClrWizard } from '@clr/angular';



@Component({
    selector: 'app-invoice-list',
    templateUrl: 'invoice-list.component.html'
})

export class InvoiceListComponent implements OnInit{
  invs: Invoice[];
  editInvOpen: boolean = false;
  invOpen: boolean = false;
  delModal: boolean = false;
  selectedInv: Invoice = {};
  deletedInv: Invoice = {};
  editInv: Invoice = {};
  newInv: Invoice = {};
  logUser: string = localStorage.getItem('username');
  searchText =''
  
  @ViewChild('editInvWizard') editInvWizard: ClrWizard;
  @ViewChild('invWizard') invWizard: ClrWizard;


constructor(
    private invSvc: InvoiceService
  
  ){ }
  
  ngOnInit(){

    this.getInv()
  
  }
  getInv(){
    this.invSvc.getInvs()
    .subscribe(res => 
        {
            this.invs = res.data
            //console.log(this.invs)
            this.getInv()
        }
    )
  }
  confirmInv(inv: any) {
    this.deletedInv = inv
    this.delModal = !this.delModal
}
  deleteInv()
  {
      this.invSvc.deleteInv(this.deletedInv.id)
      .subscribe(dinvs => {
         console.log(dinvs)
         this.delModal = false
      })
      }
      editInvWiz(inv: any) {

        this.editInvOpen = !this.editInvOpen;
        this.editInv = inv;

    }
    openWizard() {
        this.invOpen = !this.invOpen;
    }
  updateInv()
  {
      
      this.editInv.updated_by = this.logUser
      this.invSvc.updateInv(this.editInv)
      .subscribe(einvs => {
          this.getInv()
      })
      
    }

    createInv() {
        //this.newInv.proj_id = this.job.id
        this.newInv.is_paid = false
        this.newInv.created_by = this.logUser
        if (!this.newInv.is_change_order) {
            this.newInv.is_change_order = false
        }
        this.invSvc.newInv(this.newInv)
            .subscribe(ninvs => {
                console.log(ninvs)
                this.getInv()
            })

    }
}
