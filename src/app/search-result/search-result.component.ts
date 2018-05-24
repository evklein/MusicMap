import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../models/searchResult.model';
import { Router } from '@angular/router';
import { SavedEventService } from '../saved-event.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() searchResult: SearchResult;
  alreadyAddedByUser: boolean;

  constructor(private router: Router, private savedEventService: SavedEventService) { }

  ngOnInit() {
    if (this.savedEventService.has(this.searchResult.getID())) {
      this.alreadyAddedByUser = true;
    } else { 
      this.alreadyAddedByUser = false;
    }
  }

  redirectToTickets() {
    window.open(this.searchResult.getUrl());
  }

  addToEvents() {
    this.savedEventService.addToSavedEvents(this.searchResult);
    this.alreadyAddedByUser = true;
    this.savedEventService.saveEvents();
  }
}
