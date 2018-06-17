export default class Carousel {
    constructor() {
        this.carouselElement = null;
        this.containerElement = null;
    }

    render() {
        const main = document.createElement('main');
        main.className = 'container carousel-container';
        const ul = document.createElement('ul');
        ul.className = 'carousel';
        main.appendChild(ul);
        document.querySelector('.slider-wrapper').appendChild(main);

        this.carouselElement = ul;
        this.containerElement = main;
    }

    addItem(videoInfo) {
        const li = document.createElement('li');
        const parseDate = new Date(videoInfo.snippet.publishedAt).toString().slice(4, 15);
        const description = this.parseDescription(videoInfo.snippet);
        li.className = 'youtube-block';
        li.innerHTML = `<div class="card">
                             <div class="front">
                                <figure>
                                    <img src="${videoInfo.snippet.thumbnails.medium.url}" width="100%" height="150">
                                    <figcaption class="title"><a href="https://www.youtube.com/watch?v=${videoInfo.id}">${videoInfo.snippet.title}</a></figcaption>
                                </figure>               
                                <div class="main-information">
                                    <div>
                                        <i class="fa fa-user-o" aria-hidden="true"></i>
                                        <span class="video-author">${videoInfo.snippet.channelTitle}</span>
                                    </div>
                                    <div>
                                        <i class="fa fa-eye" aria-hidden="true"></i>
                                        <span>${videoInfo.statistics.viewCount ? videoInfo.statistics.viewCount : 0}</span>
                                    </div>
                                    <div>
                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                        <span>${parseDate}</span>
                                    </div>
                                    <div>
                                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                        <span>${videoInfo.statistics.likeCount ? videoInfo.statistics.likeCount : 0}</span>
                                    </div>
                                    <div>
                                        <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                                        <span>${videoInfo.statistics.dislikeCount ? videoInfo.statistics.dislikeCount : 0}</span>
                                    </div>
                                </div>
                                <a class="flip-link flip-to-description" href="#">Description</a>        
                            </div>
                            <div class="back">
                                <div class="description">
                                    <h3>Description</h3>
                                    <p>${description}</p>
                                 </div>
                            <a class="flip-link flip-back" href="#">Back</a>
                            </div>    
                        </div>`;
        this.carouselElement.appendChild(li);
        this.addHandlerForFlip();
    }

    addHandlerForFlip() {
        const lastLiElement = this.carouselElement.lastElementChild;
        const flipLinks = lastLiElement.querySelectorAll('.flip-link');
        const card = lastLiElement.querySelector('.card');
        [].forEach.call(flipLinks, (x) => {
            const elem = x;
            elem.onclick = function clickHandler() {
                card.classList.toggle('flipped');
            };
        });
    }

    renderVideoItems(initialDataArray) {
        return initialDataArray.forEach(element => this.addItem(element));
    }

    parseDescription(snippet) {
        const description = snippet.description
                            ? snippet.description
                            : snippet.title;
        const regExp = /\b(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?\b/g;
        let resultingString = description;
        let result;
        while (result = regExp.exec(description)) {
            resultingString = resultingString.replace(result[0], `<a href=${result[0]}>${result[0]}</a>`);
        }

        return resultingString.length > 200 ? `${resultingString.slice(0, 200)}...` : resultingString;
    }

    clear() {
        this.carouselElement.innerHTML = '';
    }
}
