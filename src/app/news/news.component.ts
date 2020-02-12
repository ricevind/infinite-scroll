import { Component, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
    scrolled = 0;
    lastDownloadedIndex = 40;

    stories$ = this.newsService.stories$;

    constructor(private newsService: NewsService) {}

    ngOnInit(): void {
        this.newsService.getNextStories(0, 40);
    }

    onScroll(index) {
        this.scrolled = index;
        if (this.lastDownloadedIndex - index < 20) {
            this.newsService.getNextStories(this.lastDownloadedIndex, 20);
            this.lastDownloadedIndex = this.lastDownloadedIndex + 20;
        }
    }
}
