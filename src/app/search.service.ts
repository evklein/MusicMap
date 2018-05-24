import { SearchResult } from "./models/searchResult.model";
import { EventEmitter } from "@angular/core";

export class SearchService {
    updateSearch = new EventEmitter<SearchResult[]>();

    searchResults : SearchResult[] = [];
    
    getSearchResults() {
        return this.searchResults;
    }

    addSearchResult(searchResult: SearchResult) {
        this.searchResults.push(searchResult);
        this.updateSearch.emit(this.searchResults);
    }

    clearSearchResults() {
        this.searchResults = [];
        this.updateSearch.emit(this.searchResults);
    }
}