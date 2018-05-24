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
    this.subscription = this.savedEventService.modifiedEvents.subscribe(
      (events: SearchResult[]) => {
        this.savedEvents = events;
      }
    );
    this.savedEvents = this.savedEventService.savedEvents;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
