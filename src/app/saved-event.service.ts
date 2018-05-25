import { SearchResult } from "./models/searchResult.model";
import { Subject } from "rxjs";
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SavedEventService {
    savedEvents: SearchResult[] = [];
    modifiedEvents: Subject<SearchResult[]>;

    constructor(private http: Http) {
        this.modifiedEvents = new Subject<SearchResult[]>();
        this.refreshSavedEvents();
    }
    
    refreshSavedEvents() {
        this.http.get('https://music-map-db.firebaseio.com/savedEvents.json').subscribe(
            (response: Response) => {
                let refreshedSavedEvents = response.json();
                this.savedEvents = [];
                for (let eventObj of refreshedSavedEvents) {
                    console.log(eventObj);
                    this.savedEvents.push(new SearchResult(eventObj.id, eventObj.artist, eventObj.imageURL, eventObj.datetime, eventObj.url, eventObj.venueName, eventObj.venueGlobalLocation, eventObj.ticketUrl));
                }
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
        for (let event of this.savedEvents) {
            if (event.getID() === id) {
                this.savedEvents.splice(this.savedEvents.indexOf(event), 1);
            }
        }
        this.sortByDate();
        this.modifiedEvents.next(this.savedEvents.slice());
        this.saveEvents();
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