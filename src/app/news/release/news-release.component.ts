import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-news-release',
    templateUrl: 'news-release.component.html'
})

export class NewsReleaseComponent implements OnInit{
    public version: string = environment.VERSION;

ngOnInit() {
    

}
}
