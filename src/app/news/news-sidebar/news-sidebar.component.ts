import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-news-side1bar',
    templateUrl: 'news-sidebar.component.html'
})

export class NewsSidebarComponent implements OnInit{
    public version: string = environment.VERSION;

ngOnInit() {
    

}
}
