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
  versionAlert: boolean;



constructor(
  private authSvc: AuthService
  
  
  ){ }
  
  ngOnInit(){

    console.log(`VERSION: ${environment.VERSION}`)
    if (localStorage.getItem('alertClosed') == this.version) {
      this.versionAlert = false;
    }
    else { 
      this.versionAlert = true;
    }
    
    console.log(this.userInfo)
    this.userInfo.first_name = localStorage.getItem('firstName')
    this.userInfo.last_name = localStorage.getItem('lastName')
    this.userInfo.user_name = localStorage.getItem('username')

  
  }
  closeAlert() {

    this.versionAlert = false;
    localStorage.setItem('alertClosed', this.version)
}
}