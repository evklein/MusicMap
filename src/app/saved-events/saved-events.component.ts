import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchResult } from '../models/searchResult.model';
import { Subject, Subscription } from 'rxjs';
import { SavedEventService } from '../saved-event.service';

@Component({
  selector: 'app-saved-events',
  templateUrl: './saved-events.component.html',
  styleUrls: ['./saved-events.component.css']
})
export class SavedEventsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  savedEvents: SearchResult[];

  constructor(private savedEventService: SavedEventService) { }

  ngOnInit() {
    console.log("wow");
    this.savedEventService.refreshSavedEvents();
    this.subscription = this.savedEventService.modifiedEvents.subscribe(
      (events: any[]) => {
        this.savedEvents = [];
        for (let event of events) {
          this.savedEvents.push(new SearchResult(event.id, event.artist, event.imageURL, event.datetime, event.url, event.venueName, event.venueGlobalLocation, event.ticketUrl));
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
