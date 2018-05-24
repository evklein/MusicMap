import { SearchResult } from "./models/searchResult.model";
import { Subject } from "rxjs";
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SavedEventService {
    savedEvents: SearchResult[] = [
        new SearchResult(1, 'The Black Keys', 
                         'https://bit.ly/2GJfbH6', 
                         'Tue May 29 2018 20:00:00 GMT-0400 (US Eastern Daylight Time)', 
                         'https://www.bandsintown.com/e/21206697?app_id=50&came_from=267', 
                         'The Slippery Noodle', 'Indianapolis, IN, United States', 
                          null),
    ];
    modifiedEvents: Subject<SearchResult[]>;

    constructor(private http: Http) {
        this.modifiedEvents = new Subject<SearchResult[]>();
        this.refreshSavedEvents();
    }
    
    refreshSavedEvents() {
        this.http.get('https://music-map-db.firebaseio.com/savedEvents.json').subscribe(
            (response: Response) => {
                let refreshedSavedEvents: SearchResult[] = response.json();
                this.savedEvents = refreshedSavedEvents;
                this.modifiedEvents.next(this.savedEvents.slice());
            }
        )
    }

    saveEvents() {
        this.http.put('https://music-map-db.firebaseio.com/savedEvents.json', this.savedEvents).subscribe(
            (response: Response) => {
                console.log(response);  
            });
    }

    addToSavedEvents(newEvent: SearchResult) {
        this.savedEvents.push(newEvent);
        this.sortByDate();
        this.modifiedEvents.next(this.savedEvents.slice());
    }

    removeFromSavedEvents(id: number) {
        this.savedEvents.forEach((event) => {
            if (event.getID() === id) {
                this.savedEvents.splice(this.savedEvents.indexOf(event), 1);
            }
        });
        this.sortByDate();
        this.modifiedEvents.next(this.savedEvents.slice());
    }

    has(id: number) {
        for (let event of this.savedEvents) {
            if (event.getID() === id) {
                return true;
            }
        }
        return false;
    }

    getByID(id: number) {
        console.log(id);
        for (let event of this.savedEvents) {
            console.log("Comparing: " + event.getID() + " === " + id);
            if (event.getID() === id) {
                console.log('found event!');
                return event;
            }
        }
        return null;
    }

    sortByDate() {
        this.savedEvents.sort((a, b): any => {
            return +a.getDatetime() - +b.getDatetime();
        })
    }
}