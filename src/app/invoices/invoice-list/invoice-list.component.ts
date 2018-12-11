import { Component, OnInit} from '@angular/core';
import { Invoice } from '../../shared/models';
import { InvoiceService} from '../../shared/services';


@Component({
    selector: 'app-invoice-list',
    templateUrl: 'invoice-list.component.html'
})

export class InvoiceListComponent implements OnInit{
  invs: Invoice[];



constructor(
    private invSvc: InvoiceService
  
  ){ }
  
  ngOnInit(){
    this.invSvc.getInvs()
    .subscribe(res => 
        {
            this.invs = res.data
            console.log(this.invs)
        }
    )

  
  }
}