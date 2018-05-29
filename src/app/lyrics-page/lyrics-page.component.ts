import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LyricsSearchService } from './lyrics-search.service';

@Component({
  selector: 'app-lyrics-page',
  templateUrl: './lyrics-page.component.html',
  styleUrls: ['./lyrics-page.component.css']
})
export class LyricsPageComponent implements OnInit {
  successfulSearch: boolean = false;
  lyrics: string;

  constructor(private lyricsSearchService: LyricsSearchService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let artist = form.value.artist;
    let song = form.value.song;
    console.log("Getting lyrics for: " + song + " by " + artist);
    this.lyricsSearchService.getLyrics(artist, song).subscribe((data) => {
      this.lyrics = data['lyrics'];
      if (this.lyrics !== '') {
        this.successfulSearch = true;
      }
    });
  }
}
