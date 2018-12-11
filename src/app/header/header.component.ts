import { Component, OnInit} from '@angular/core';
import { Subscription, } from 'rxjs';
import { User, UserAccess } from '../shared/models';
import { AuthService } from '../shared/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit{
  userInfo: User = {};
  public version: string = environment.VERSION;



constructor(
  private authSvc: AuthService
  
  
  ){ }
  
  ngOnInit(){
    console.log(`VERSION: ${environment.VERSION}`)
    
    this.userInfo.first_name = localStorage.getItem('firstName')
    this.userInfo.last_name = localStorage.getItem('lastName')

  
  }
}