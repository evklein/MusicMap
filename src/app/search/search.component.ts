import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { SearchResult } from '../models/searchResult.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() searchKey: string;
  isSearching: boolean = false;
  hasResults: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit() { 
    // this.errorElementReference.changes.subscribe(changes => console.log(changes));
  }

  search() {
    this.isSearching = true;
    const API_KEY: string = '?app_id=70'
    this.getArtist(API_KEY);
  }

  getArtist(API_KEY: string) {
    let artistSearchUrl: string = 'https://rest.bandsintown.com/artists/' + this.searchKey + API_KEY;
    let artistName;
    fetch(artistSearchUrl).then(function(response) {
      return response.json();
    }).then(function(rawJSON) {
      if (rawJSON.name === '') { // No results for artist, send message to user.

      } else {
        this.getArtistEvents(rawJSON.name, rawJSON.image_url, API_KEY);
      }
    }.bind(this));
  }

  getArtistEvents(artistName: string, imageURL: string, API_KEY: string) {
    let eventSearchUrl: string = 'https://rest.bandsintown.com/artists/' + artistName + '/events' + API_KEY;
    fetch(eventSearchUrl).then(function(response) {
      return response.json();
    }).then(function(rawJSON) {
      // TODO: Create new object.
      this.searchService.clearSearchResults();
      if (rawJSON.length > 0) {
        this.hasResults = true;
      }
      for (let i = 0; i < rawJSON.length; i++) {
        let newSearchResult: SearchResult = new SearchResult(rawJSON[i].id, artistName, imageURL, rawJSON[i].datetime, rawJSON[i].url,
              rawJSON[i].venue.name, this.getLocation(rawJSON[i]), rawJSON[i].offers.url);
        this.searchService.addSearchResult(newSearchResult);
      }
      this.isSearching = false;
    }.bind(this));
  }

  private getLocation(jsonObject) {
    let location: string = '';
    if (jsonObject.venue.region) {
      location = jsonObject.venue.city + ', ' + jsonObject.venue.region + ', ' + jsonObject.venue.country;
    } else { 
      location = jsonObject.venue.city + ', ' + jsonObject.venue.country;
    }
    return location;
  }

  clearResults() {
    this.searchService.clearSearchResults();
    this.hasResults = false;
    this.searchKey = '';
  }
}
