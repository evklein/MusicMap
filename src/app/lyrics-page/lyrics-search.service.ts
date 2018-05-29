import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LyricsSearchService {
    URL: string = "https://api.lyrics.ovh/v1/";

    constructor(private http: HttpClient) {}

    getLyrics(artist: string, song: string) {
        let endpoint: string = this.URL + artist + '/' + song;
        return this.http.get(endpoint);
    }
}