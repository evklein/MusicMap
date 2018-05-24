import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../models/searchResult.model';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchService } from '../search.service';
import { SavedEventService } from '../saved-event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  private savedEvent: SearchResult;

  constructor(private activatedRoute: ActivatedRoute, private savedEventService: SavedEventService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.savedEvent = this.savedEventService.getByID(+params['id']);
    });
    console.log(this.savedEvent);
  }

}
