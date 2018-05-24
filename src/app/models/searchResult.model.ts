export class SearchResult {
    private id: number;
    private artist: string;
    private imageURL: string;
    private datetime: Date;
    private url: string;
    private venueName: string;
    private venueGlobalLocation: string;
    private ticketUrl: string;
    
    constructor(id: number, artist: string, imageURL: string, datetime: string, url: string, venueName: string, venueGlobalLocation: string, ticketUrl: string) {
        this.id = id;
        this.artist = artist;
        this.imageURL = imageURL;
        this.datetime = new Date(datetime);
        this.url = url;
        this.venueName = venueName;
        this.venueGlobalLocation = venueGlobalLocation;
        this.ticketUrl = ticketUrl;
    }

    getID() {
        return this.id;
    }

    getArtist() {
        return this.artist;
    }

    getDatetime() {
        return this.datetime;
    }

    getUrl() {
        return this.url;
    }
}