import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    concatMap,
    first,
    map,
    scan,
    shareReplay,
    startWith,
} from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    private readonly url = ` https://hacker-news.firebaseio.com/v0`;
    private nextBatchOfIds$ = new BehaviorSubject<string[]>([]);

    stories$ = this.nextBatchOfIds$.pipe(
        concatMap(ids => forkJoin(ids.map(id => this.getStory(id)))),
        scan((acc, stories) => [...acc, ...stories], []),
        startWith([]),
    );

    newStoriesIds$ = this.httpClient
        .get<string[]>(`${this.url}/topstories.json`)
        .pipe(
            map(resp => resp),
            shareReplay(1),
        );

    constructor(private httpClient: HttpClient) {}

    getStory(id: string) {
        return this.httpClient.get(`${this.url}/item/${id}.json`);
    }

    getAllStories() {
        return this.newStoriesIds$.pipe(
            map(ids => ids.map(id => this.getStory(id).pipe(shareReplay(1)))),
        );
    }

    getNextStories(offset: number, limit: number) {
        this.newStoriesIds$
            .pipe(
                first(),
                map(ids =>
                    ids.filter(
                        (_, index) => index >= offset && index < offset + limit,
                    ),
                ),
            )
            .subscribe(ids => this.nextBatchOfIds$.next(ids));
    }
}
