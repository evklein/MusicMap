import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../../models/searchResult.model';
import { SavedEventService } from '../../saved-event.service';

@Component({
  selector: 'app-saved-event',
  templateUrl: './saved-event.component.html',
  styleUrls: ['./saved-event.component.css']
})
export class SavedEventComponent implements OnInit {
  @Input() searchResult: SearchResult;

  constructor(private savedEventService: SavedEventService) { }

  ngOnInit() {

  }

  onRemove() {
    this.savedEventService.removeFromSavedEvents(this.searchResult.getID());
  }

  redirectToTickets() {
    window.open(this.searchResult.getUrl());
  }
}
