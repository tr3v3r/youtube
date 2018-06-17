export default class YoutubeTaskLayout {
    constructor() {
        this.searchLineWrapper = null;
        this.sliderWrapper = null;
    }

    render() {
        this.searchLineWrapper = this.createWrapper('search-line-wrapper');
        this.sliderWrapper = this.createWrapper('slider-wrapper');
        document.body.appendChild(this.searchLineWrapper);
        document.body.appendChild(this.sliderWrapper);
    }

    createWrapper(className) {
        const div = document.createElement('div');
        div.className = className;
        return div;
    }
}
