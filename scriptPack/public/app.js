import 'whatwg-fetch';
import YoutubeTaskLayout from './YoutubeTaskLayout';
import SearchRequest from './SearchRequest';
import SearchLine from './SearchLine';
import Carousel from './Carousel';
import SwipeHandlers from './SwipeHandlers';
import Pagination from './Pagination';
import clearToInitialState from './clearFunction';

const YTL = new YoutubeTaskLayout();
const searchRequest = new SearchRequest();
const searchLine = new SearchLine();
const carousel = new Carousel();
const pagination = new Pagination();

YTL.render();
searchLine.render();
carousel.render();
pagination.render();

const handler = new SwipeHandlers(carousel.carouselElement,
                                  carousel.containerElement,
                                  pagination.paginationElement,
                                  );

searchLine.formElement.addEventListener('submit', (event) => {
    clearToInitialState(carousel, pagination, handler);

    searchRequest.search(searchLine.inputElement.value)
                 .then((arrayOfResults) => {
                     carousel.renderVideoItems(arrayOfResults);
                     pagination.addPage(arrayOfResults.length);
                     handler.definePreviousPage(pagination.previousPage);
                 });

    searchLine.inputElement.value = '';
    event.preventDefault();
});

document.addEventListener('swipe', () => {
    if (handler.needPreloading()) {
        searchRequest.nextPage().then((arrayOfResults) => {
            carousel.renderVideoItems(arrayOfResults);
            pagination.addPage(arrayOfResults.length);
        });
    }
});

YTL.sliderWrapper.addEventListener('touchstart', handler.touchStart.bind(handler));
YTL.sliderWrapper.addEventListener('touchmove', handler.touchMove.bind(handler));
YTL.sliderWrapper.addEventListener('touchend', handler.touchEnd.bind(handler));

YTL.sliderWrapper.addEventListener('mousedown', handler.touchStart.bind(handler));
YTL.sliderWrapper.addEventListener('mousemove', handler.touchMove.bind(handler));
YTL.sliderWrapper.addEventListener('mouseup', handler.touchEnd.bind(handler));

window.onresize = window.onload = handler.resize.bind(handler);

pagination.paginationContainerElement.addEventListener('click', handler.paginationClickHandler.bind(handler));

carousel.carouselElement.addEventListener('webkitTransitionEnd', handler.removeTransition.bind(handler));
