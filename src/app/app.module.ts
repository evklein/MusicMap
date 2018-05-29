import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchService } from './search.service';
import { AppRoutingModule } from './app-routing-module';
import { SavedEventsComponent } from './saved-events/saved-events.component';
import { SavedEventComponent } from './saved-events/saved-event/saved-event.component';
import { SavedEventService } from './saved-event.service';
import { EventPageComponent } from './event-page/event-page.component';
import { HttpModule } from '@angular/http';
import { LyricsPageComponent } from './lyrics-page/lyrics-page.component';
import { LyricsSearchService } from './lyrics-page/lyrics-search.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    SearchComponent,
    SearchResultsComponent,
    SavedEventsComponent,
    SavedEventComponent,
    EventPageComponent,
    LyricsPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [SearchService, SavedEventService, LyricsSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
