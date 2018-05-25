export class SearchResult {
    private id: number;
    private artist: string;
    private imageURL: string;
    private datetime: string;
    private url: string;
    private venueName: string;
    private venueGlobalLocation: string;
    private ticketUrl: string;
    
    constructor(id: number, artist: string, imageURL: string, datetime: string, url: string, venueName: string, venueGlobalLocation: string, ticketUrl: string) {
        this.id = id;
        this.artist = artist;
        this.imageURL = imageURL;
        this.datetime = datetime;
        this.url = url;
        this.venueName = venueName;
        this.venueGlobalLocation = venueGlobalLocation;
        this.ticketUrl = ticketUrl;
    }

    getArtist() {
        return this.artist;
    }

    getDatetime() {
        return new Date(this.datetime);
    }

    getUrl() {
        return this.url;
    }

    getID() {
        return this.id;
    }
}