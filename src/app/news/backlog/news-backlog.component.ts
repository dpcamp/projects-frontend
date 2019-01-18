import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-news-backlog',
    templateUrl: 'news-backlog.component.html'
})

export class NewsBacklogComponent implements OnInit {
    public version: string = environment.VERSION;

    ngOnInit() {


    }
}