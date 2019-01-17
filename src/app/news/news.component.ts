import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-news',
    templateUrl: 'news.component.html'
})

export class NewsComponent implements OnInit{
    public version: string = environment.VERSION;

ngOnInit() {
    

}
}

