export default class SearchRequest {
    constructor() {
        this.searchRequest = null;
        this.token = null;
        this.url = null;
    }

    search(request) {
        this.setRequestUrl(request);
        return this.requestPromise(this.url);
    }

    nextPage() {
        return this.search();
    }

    setRequestUrl(request) {
        if (request) {
            this.searchRequest = request;
            this.url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchRequest}&key=AIzaSyC3SjFs8zSanrWcZ-jnO0Es17V5yFKbA-A&maxResults=15&type=video`;
        } else if (this.token) {
            this.url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchRequest}&key=AIzaSyC3SjFs8zSanrWcZ-jnO0Es17V5yFKbA-A&maxResults=15&type=video&pageToken=${this.token}`;
        }
    }

    requestPromise(url) {
        return fetch(url)
                .then(response => response.json())
                .then((json) => {
                    this.token = json.nextPageToken;
                    return json.items.map(x => x.id.videoId);
                })
                .then(result => this.requestStatisticsForVideos(result))
                .catch(error => error);
    }

    requestStatisticsForVideos(arrayOfId) {
        return fetch(`https://www.googleapis.com/youtube/v3/videos?id=${arrayOfId.join()}&key=AIzaSyC3SjFs8zSanrWcZ-jnO0Es17V5yFKbA-A&part=snippet,statistics`)
                                 .then(response => response.json())
                                 .then(json => json.items);
    }
}
