/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Carousel = function () {
    function Carousel() {
        _classCallCheck(this, Carousel);

        this.carouselElement = null;
        this.containerElement = null;
    }

    _createClass(Carousel, [{
        key: 'render',
        value: function render() {
            var main = document.createElement('main');
            main.className = 'container carousel-container';
            var ul = document.createElement('ul');
            ul.className = 'carousel';
            main.appendChild(ul);
            document.querySelector('.slider-wrapper').appendChild(main);

            this.carouselElement = ul;
            this.containerElement = main;
        }
    }, {
        key: 'addItem',
        value: function addItem(videoInfo) {
            var li = document.createElement('li');
            var parseDate = new Date(videoInfo.snippet.publishedAt).toString().slice(4, 15);
            var description = this.parseDescription(videoInfo.snippet);
            li.className = 'youtube-block';
            li.innerHTML = '<div class="card">\n                             <div class="front">\n                                <figure>\n                                    <img src="' + videoInfo.snippet.thumbnails.medium.url + '" width="100%" height="150">\n                                    <figcaption class="title"><a href="https://www.youtube.com/watch?v=' + videoInfo.id + '">' + videoInfo.snippet.title + '</a></figcaption>\n                                </figure>               \n                                <div class="main-information">\n                                    <div>\n                                        <i class="fa fa-user-o" aria-hidden="true"></i>\n                                        <span class="video-author">' + videoInfo.snippet.channelTitle + '</span>\n                                    </div>\n                                    <div>\n                                        <i class="fa fa-eye" aria-hidden="true"></i>\n                                        <span>' + (videoInfo.statistics.viewCount ? videoInfo.statistics.viewCount : 0) + '</span>\n                                    </div>\n                                    <div>\n                                        <i class="fa fa-calendar" aria-hidden="true"></i>\n                                        <span>' + parseDate + '</span>\n                                    </div>\n                                    <div>\n                                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>\n                                        <span>' + (videoInfo.statistics.likeCount ? videoInfo.statistics.likeCount : 0) + '</span>\n                                    </div>\n                                    <div>\n                                        <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>\n                                        <span>' + (videoInfo.statistics.dislikeCount ? videoInfo.statistics.dislikeCount : 0) + '</span>\n                                    </div>\n                                </div>\n                                <a class="flip-link flip-to-description" href="#">Description</a>        \n                            </div>\n                            <div class="back">\n                                <div class="description">\n                                    <h3>Description</h3>\n                                    <p>' + description + '</p>\n                                 </div>\n                            <a class="flip-link flip-back" href="#">Back</a>\n                            </div>    \n                        </div>';
            this.carouselElement.appendChild(li);
            this.addHandlerForFlip();
        }
    }, {
        key: 'addHandlerForFlip',
        value: function addHandlerForFlip() {
            var lastLiElement = this.carouselElement.lastElementChild;
            var flipLinks = lastLiElement.querySelectorAll('.flip-link');
            var card = lastLiElement.querySelector('.card');
            [].forEach.call(flipLinks, function (x) {
                var elem = x;
                elem.onclick = function clickHandler() {
                    card.classList.toggle('flipped');
                };
            });
        }
    }, {
        key: 'renderVideoItems',
        value: function renderVideoItems(initialDataArray) {
            var _this = this;

            return initialDataArray.forEach(function (element) {
                return _this.addItem(element);
            });
        }
    }, {
        key: 'parseDescription',
        value: function parseDescription(snippet) {
            var description = snippet.description ? snippet.description : snippet.title;
            var regExp = /\b(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?\b/g;
            var resultingString = description;
            var result = void 0;
            while (result = regExp.exec(description)) {
                resultingString = resultingString.replace(result[0], '<a href=' + result[0] + '>' + result[0] + '</a>');
            }

            return resultingString.length > 200 ? resultingString.slice(0, 200) + '...' : resultingString;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.carouselElement.innerHTML = '';
        }
    }]);

    return Carousel;
}();

exports.default = Carousel;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pagination = function () {
    function Pagination() {
        _classCallCheck(this, Pagination);

        this.paginationContainerElement = null;
        this.nextPageNumber = 1;
        this.paginationElement = null;
        this.previousPage = null;
        this.buttonToLeft = null;
        this.buttonToRight = null;
    }

    _createClass(Pagination, [{
        key: 'render',
        value: function render() {
            var footer = this.createElement('footer', 'pagination-container');
            var ul = this.createElement('ul', 'pagination');
            var btnLeft = this.createElement('button', 'btn btn-left-page', '<i class="fa fa-angle-left" aria-hidden="true"></i>');
            var btnRight = this.createElement('button', 'btn btn-right-page', '<i class="fa fa-angle-right" aria-hidden="true"></i>');

            footer.appendChild(btnLeft);
            footer.appendChild(ul);
            footer.appendChild(btnRight);
            document.querySelector('.slider-wrapper').appendChild(footer);

            this.buttonToLeft = btnLeft;
            this.buttonToRight = btnRight;
            this.paginationContainerElement = footer;
            this.paginationElement = ul;
        }
    }, {
        key: 'addPage',
        value: function addPage(amountOfElements) {
            for (var i = 0; i < amountOfElements; i++) {
                var li = this.createElement('li', '', this.nextPageNumber);

                this.buttonToLeft.classList.add('btn-visibility');
                this.buttonToRight.classList.add('btn-visibility');

                if (this.nextPageNumber === 1) {
                    li.className = 'active';
                    this.previousPage = li;
                }

                if (this.nextPageNumber === 22) {
                    this.paginationContainerElement.style.width = '310px';
                }

                if (this.nextPageNumber >= 15 && this.nextPageNumber < 21) {
                    i -= 1;
                }

                this.paginationElement.appendChild(li);
                this.nextPageNumber += 1;
            }
        }
    }, {
        key: 'createElement',
        value: function createElement(tag, className) {
            var innerHtml = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            var elem = document.createElement(tag);
            elem.className = className;
            elem.innerHTML = innerHtml;
            return elem;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.paginationElement.innerHTML = '';
            this.nextPageNumber = 1;
            this.buttonToLeft.classList.remove('btn-visibility');
            this.buttonToRight.classList.remove('btn-visibility');
            this.paginationContainerElement.style.width = '';
        }
    }]);

    return Pagination;
}();

exports.default = Pagination;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchLine = function () {
    function SearchLine() {
        _classCallCheck(this, SearchLine);

        this.formElement = null;
        this.inputElement = null;
        this.labelElelement = null;
    }

    _createClass(SearchLine, [{
        key: 'render',
        value: function render() {
            var header = document.createElement('header');
            header.className = 'container';
            header.innerHTML = '<form class="search-form" action="">   \n                            <input type="text" name="" onfocus = "this.select();"  required placeholder = \'Search video\'>\n                            <button  class="mini-btn"><i class="fa fa-search" aria-hidden="true"></i></button>\n                            <button class="main-btn">Search</button>     \n                            </form>';
            document.querySelector('.search-line-wrapper').appendChild(header);

            this.formElement = document.querySelector('.search-form');
            this.inputElement = this.formElement.querySelector('input');
            this.labelElelement = this.formElement.querySelector('label');
        }
    }]);

    return SearchLine;
}();

exports.default = SearchLine;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchRequest = function () {
    function SearchRequest() {
        _classCallCheck(this, SearchRequest);

        this.searchRequest = null;
        this.token = null;
        this.url = null;
    }

    _createClass(SearchRequest, [{
        key: "search",
        value: function search(request) {
            this.setRequestUrl(request);
            return this.requestPromise(this.url);
        }
    }, {
        key: "nextPage",
        value: function nextPage() {
            return this.search();
        }
    }, {
        key: "setRequestUrl",
        value: function setRequestUrl(request) {
            if (request) {
                this.searchRequest = request;
                this.url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + this.searchRequest + "&key=AIzaSyC3SjFs8zSanrWcZ-jnO0Es17V5yFKbA-A&maxResults=15&type=video";
            } else if (this.token) {
                this.url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + this.searchRequest + "&key=AIzaSyC3SjFs8zSanrWcZ-jnO0Es17V5yFKbA-A&maxResults=15&type=video&pageToken=" + this.token;
            }
        }
    }, {
        key: "requestPromise",
        value: function requestPromise(url) {
            var _this = this;

            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (json) {
                _this.token = json.nextPageToken;
                return json.items.map(function (x) {
                    return x.id.videoId;
                });
            }).then(function (result) {
                return _this.requestStatisticsForVideos(result);
            }).catch(function (error) {
                return error;
            });
        }
    }, {
        key: "requestStatisticsForVideos",
        value: function requestStatisticsForVideos(arrayOfId) {
            return fetch("https://www.googleapis.com/youtube/v3/videos?id=" + arrayOfId.join() + "&key=AIzaSyC3SjFs8zSanrWcZ-jnO0Es17V5yFKbA-A&part=snippet,statistics").then(function (response) {
                return response.json();
            }).then(function (json) {
                return json.items;
            });
        }
    }]);

    return SearchRequest;
}();

exports.default = SearchRequest;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwipeHandlers = function () {
    function SwipeHandlers(carousel, container, paginationElement) {
        _classCallCheck(this, SwipeHandlers);

        this.carousel = carousel;
        this.container = container;
        this.paginationElement = paginationElement;
        this.paginationElementContainer = paginationElement.parentNode;
        this.previousPage = null;
        this.xFirstPoint = null;
        this.swipeLeft = false;
        this.swipeRight = false;
        this.swiping = false;
        this.swipeRestriction = 40;
        this.translate = 0;
        this.containerWidth = parseInt(getComputedStyle(this.container).width, 10) + 60;
        this.swipeEvent = new CustomEvent('swipe');
        this.animateNow = false;
        this.start = null;
    }

    _createClass(SwipeHandlers, [{
        key: 'touchStart',
        value: function touchStart(event) {
            this.xFirstPoint = event.touches ? event.touches[0].clientX : event.clientX;
            this.start = +new Date();
        }
    }, {
        key: 'touchMove',
        value: function touchMove(event) {
            if (!this.xFirstPoint || !this.carousel.children.length) return;
            var xLastPoint = event.touches ? event.touches[0].clientX : event.clientX;
            var xDiff = this.xFirstPoint - xLastPoint;

            if (Math.abs(xDiff) > this.swipeRestriction) this.swiping = true;else this.swiping = false;

            if (+new Date() - this.start > 120) {
                this.carousel.classList.remove('trans-animate');
            }
            this.changeCarouselTranslateTo(this.translate - xDiff);

            if (xDiff > 0) {
                this.swipeLeft = true;
                this.swipeRight = false;
            } else {
                this.swipeRight = true;
                this.swipeLeft = false;
            }

            event.preventDefault();
        }
    }, {
        key: 'touchEnd',
        value: function touchEnd() {
            this.carousel.classList.add('trans-animate');
            if (this.swiping) {
                this.calculateSwipe(this.swipeLeft, this.swipeRight);
                this.renderSwipe();
            }

            this.changeCarouselTranslateTo(this.translate);
            this.xFirstPoint = null;
        }
    }, {
        key: 'calculateSwipe',
        value: function calculateSwipe(toLeft, toRight) {
            if (toLeft) {
                this.translate -= this.containerWidth;
                this.changeActivePage(this.previousPage.nextElementSibling);
                this.changePreviousPageTo(this.previousPage.nextElementSibling);
            } else if (toRight) {
                this.translate += this.containerWidth;
                if (this.previousPage.previousElementSibling) {
                    this.changeActivePage(this.previousPage.previousElementSibling);
                    this.changePreviousPageTo(this.previousPage.previousElementSibling);
                }
            }
        }
    }, {
        key: 'renderSwipe',
        value: function renderSwipe() {
            this.checkTheEdgesOfCarousel();
            this.changeCarouselTranslateTo(this.translate);
            this.swiping = false;
            document.dispatchEvent(this.swipeEvent);
            this.animateNow = true;
        }
    }, {
        key: 'changeCarouselTranslateTo',
        value: function changeCarouselTranslateTo(translate) {
            this.carousel.style.transform = 'translate3d(' + translate + 'px,0,0)';
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.containerWidth = parseInt(getComputedStyle(this.container).width, 10) + 60;
            this.addStyleOnMobileDevices();
            this.calculatePageNumberAfterResize();
        }
    }, {
        key: 'calculatePageNumberAfterResize',
        value: function calculatePageNumberAfterResize() {
            var newPageNumber = Math.ceil(Math.abs(this.translate) / this.containerWidth);
            var pages = this.paginationElement.children;
            for (var i = 0; i < pages.length; i++) {
                if (Number(pages[i].innerHTML) === newPageNumber) {
                    this.changeActivePage(pages[i + 1]);
                    this.changePreviousPageTo(pages[i + 1]);
                }
            }
        }
    }, {
        key: 'paginationClickHandler',
        value: function paginationClickHandler(event) {
            var target = event.target;
            if (target.tagName === 'LI') {
                this.changeActivePage(target);
                this.translate -= this.containerWidth * (Number(target.innerHTML) - Number(this.previousPage.innerHTML));
                this.changePreviousPageTo(target);
                this.renderSwipe();
            }

            var left = false;
            var right = false;

            if (target.closest('.btn')) {
                if (target.closest('.btn-left-page')) right = true;else if (target.closest('.btn-right-page')) left = true;
                this.calculateSwipe(left, right);
                this.renderSwipe();
            }
        }
    }, {
        key: 'definePreviousPage',
        value: function definePreviousPage(prevPage) {
            this.previousPage = prevPage;
        }
    }, {
        key: 'changeActivePage',
        value: function changeActivePage(nextPage) {
            if (!nextPage) return;
            this.previousPage.classList.remove('active');
            nextPage.classList.add('active');
            this.swipePages(nextPage);
        }
    }, {
        key: 'swipePages',
        value: function swipePages(nextPage) {
            var translate = 35 * (Number(nextPage.innerHTML) - 4);
            if (translate < 0) translate = 0;
            this.paginationElement.style.transform = 'translate3d(-' + translate + 'px,0,0)';
        }
    }, {
        key: 'checkTheEdgesOfCarousel',
        value: function checkTheEdgesOfCarousel() {
            var carouselWidth = this.carousel.children.length * 310;
            if (this.translate > 0) {
                this.translate = 0;
            }
            if (Math.abs(this.translate) + this.containerWidth > carouselWidth) {
                this.translate = -carouselWidth + this.containerWidth;
                this.calculatePageNumberAfterResize();
            }
        }
    }, {
        key: 'changePreviousPageTo',
        value: function changePreviousPageTo(nextPage) {
            if (!nextPage) return;
            this.previousPage = nextPage;
        }
    }, {
        key: 'clearCarouselProperties',
        value: function clearCarouselProperties() {
            this.translate = 0;
            this.swipeLeft = false;
            this.swipeRight = false;
            this.paginationElement.style.transform = 'translate3d(0,0,0)';
            this.changeCarouselTranslateTo(this.translate);
        }
    }, {
        key: 'addStyleOnMobileDevices',
        value: function addStyleOnMobileDevices() {
            if (document.documentElement.offsetWidth < 566) {
                var width = document.documentElement.offsetWidth;
                var paddingForPaging = (width - 240) / 2;
                var paddingForCarousel = (width - 250) / 2;

                this.containerWidth -= paddingForCarousel * 2;

                this.paginationElementContainer.classList.add('pseudo');
                this.container.classList.add('pseudo');

                this.paginationElementContainer.style.padding = '0 ' + paddingForPaging + 'px';
                this.container.style.padding = '10px ' + paddingForCarousel + 'px';

                var style = document.createElement('style');
                style.innerHTML = '.pseudo:before {width: ' + (width - 252) / 2 + 'px}\n                               .pseudo:after {width: ' + (width - 252) / 2 + 'px}';
                document.querySelector('head').appendChild(style);
            } else {
                this.paginationElementContainer.classList.remove('pseudo');
                this.container.classList.remove('pseudo');

                this.paginationElementContainer.style.padding = '';
                this.container.style.padding = '';
            }
        }
    }, {
        key: 'needPreloading',
        value: function needPreloading() {
            var carouselWidth = this.carousel.children.length * 310;
            var multiplier = this.containerWidth <= 310 ? 4 : 2;
            multiplier = this.containerWidth > 310 && this.containerWidth <= 620 ? 3 : multiplier;

            return Math.abs(this.translate) + this.containerWidth > carouselWidth - this.containerWidth * multiplier;
        }
    }, {
        key: 'removeTransition',
        value: function removeTransition() {
            this.carousel.classList.remove('trans-animate');
        }
    }]);

    return SwipeHandlers;
}();

exports.default = SwipeHandlers;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YoutubeTaskLayout = function () {
    function YoutubeTaskLayout() {
        _classCallCheck(this, YoutubeTaskLayout);

        this.searchLineWrapper = null;
        this.sliderWrapper = null;
    }

    _createClass(YoutubeTaskLayout, [{
        key: 'render',
        value: function render() {
            this.searchLineWrapper = this.createWrapper('search-line-wrapper');
            this.sliderWrapper = this.createWrapper('slider-wrapper');
            document.body.appendChild(this.searchLineWrapper);
            document.body.appendChild(this.sliderWrapper);
        }
    }, {
        key: 'createWrapper',
        value: function createWrapper(className) {
            var div = document.createElement('div');
            div.className = className;
            return div;
        }
    }]);

    return YoutubeTaskLayout;
}();

exports.default = YoutubeTaskLayout;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clearToInitialState;
function clearToInitialState(carousel, pagination, handler) {
    carousel.clear();
    pagination.clear();
    handler.clearCarouselProperties();
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);

var _YoutubeTaskLayout = __webpack_require__(5);

var _YoutubeTaskLayout2 = _interopRequireDefault(_YoutubeTaskLayout);

var _SearchRequest = __webpack_require__(3);

var _SearchRequest2 = _interopRequireDefault(_SearchRequest);

var _SearchLine = __webpack_require__(2);

var _SearchLine2 = _interopRequireDefault(_SearchLine);

var _Carousel = __webpack_require__(0);

var _Carousel2 = _interopRequireDefault(_Carousel);

var _SwipeHandlers = __webpack_require__(4);

var _SwipeHandlers2 = _interopRequireDefault(_SwipeHandlers);

var _Pagination = __webpack_require__(1);

var _Pagination2 = _interopRequireDefault(_Pagination);

var _clearFunction = __webpack_require__(6);

var _clearFunction2 = _interopRequireDefault(_clearFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YTL = new _YoutubeTaskLayout2.default();
var searchRequest = new _SearchRequest2.default();
var searchLine = new _SearchLine2.default();
var carousel = new _Carousel2.default();
var pagination = new _Pagination2.default();

YTL.render();
searchLine.render();
carousel.render();
pagination.render();

var handler = new _SwipeHandlers2.default(carousel.carouselElement, carousel.containerElement, pagination.paginationElement);

searchLine.formElement.addEventListener('submit', function (event) {
    (0, _clearFunction2.default)(carousel, pagination, handler);

    searchRequest.search(searchLine.inputElement.value).then(function (arrayOfResults) {
        carousel.renderVideoItems(arrayOfResults);
        pagination.addPage(arrayOfResults.length);
        handler.definePreviousPage(pagination.previousPage);
    });

    searchLine.inputElement.value = '';
    event.preventDefault();
});

document.addEventListener('swipe', function () {
    if (handler.needPreloading()) {
        searchRequest.nextPage().then(function (arrayOfResults) {
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

/***/ })
/******/ ]);