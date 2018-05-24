import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../models/searchResult.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchResults : SearchResult[];
  searchResultCount: number;

  constructor(private searchService: SearchService) { }
  
  ngOnInit() { 
    this.searchResults = this.searchService.getSearchResults();
    this.searchService.updateSearch.subscribe((searchResults: SearchResult[]) => {
      this.searchResults = searchResults;
      this.searchResultCount = this.searchResults.length;
    })
  }

  onAddResult(searchResult: SearchResult) {
    this.searchResults.push(searchResult);
  }
}
