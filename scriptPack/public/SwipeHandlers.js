export default class SwipeHandlers {
    constructor(carousel, container, paginationElement) {
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

    touchStart(event) {
        this.xFirstPoint = event.touches
                           ? event.touches[0].clientX
                           : event.clientX;
        this.start = +new Date();
    }

    touchMove(event) {
        if (!this.xFirstPoint || !this.carousel.children.length) return;
        const xLastPoint = event.touches
                         ? event.touches[0].clientX
                         : event.clientX;
        const xDiff = this.xFirstPoint - xLastPoint;

        if (Math.abs(xDiff) > this.swipeRestriction) this.swiping = true;
        else this.swiping = false;

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

    touchEnd() {
        this.carousel.classList.add('trans-animate');
        if (this.swiping) {
            this.calculateSwipe(this.swipeLeft, this.swipeRight);
            this.renderSwipe();
        }

        this.changeCarouselTranslateTo(this.translate);
        this.xFirstPoint = null;
    }

    calculateSwipe(toLeft, toRight) {
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

    renderSwipe() {
        this.checkTheEdgesOfCarousel();
        this.changeCarouselTranslateTo(this.translate);
        this.swiping = false;
        document.dispatchEvent(this.swipeEvent);
        this.animateNow = true;
    }

    changeCarouselTranslateTo(translate) {
        this.carousel.style.transform = `translate3d(${translate}px,0,0)`;
    }

    resize() {
        this.containerWidth = parseInt(getComputedStyle(this.container).width, 10) + 60;
        this.addStyleOnMobileDevices();
        this.calculatePageNumberAfterResize();
    }

    calculatePageNumberAfterResize() {
        const newPageNumber = Math.ceil(Math.abs(this.translate) / this.containerWidth);
        const pages = this.paginationElement.children;
        for (let i = 0; i < pages.length; i++) {
            if (Number(pages[i].innerHTML) === newPageNumber) {
                this.changeActivePage(pages[i + 1]);
                this.changePreviousPageTo(pages[i + 1]);
            }
        }
    }

    paginationClickHandler(event) {
        const target = event.target;
        if (target.tagName === 'LI') {
            this.changeActivePage(target);
            this.translate -= this.containerWidth
            * (Number(target.innerHTML) - Number(this.previousPage.innerHTML));
            this.changePreviousPageTo(target);
            this.renderSwipe();
        }

        let left = false;
        let right = false;

        if (target.closest('.btn')) {
            if (target.closest('.btn-left-page')) right = true;
            else if (target.closest('.btn-right-page')) left = true;
            this.calculateSwipe(left, right);
            this.renderSwipe();
        }
    }

    definePreviousPage(prevPage) {
        this.previousPage = prevPage;
    }

    changeActivePage(nextPage) {
        if (!nextPage) return;
        this.previousPage.classList.remove('active');
        nextPage.classList.add('active');
        this.swipePages(nextPage);
    }

    swipePages(nextPage) {
        let translate = 35 * (Number(nextPage.innerHTML) - 4);
        if (translate < 0) translate = 0;
        this.paginationElement.style.transform = `translate3d(-${translate}px,0,0)`;
    }

    checkTheEdgesOfCarousel() {
        const carouselWidth = this.carousel.children.length * 310;
        if (this.translate > 0) {
            this.translate = 0;
        }
        if (Math.abs(this.translate) + this.containerWidth > carouselWidth) {
            this.translate = -carouselWidth + this.containerWidth;
            this.calculatePageNumberAfterResize();
        }
    }

    changePreviousPageTo(nextPage) {
        if (!nextPage) return;
        this.previousPage = nextPage;
    }

    clearCarouselProperties() {
        this.translate = 0;
        this.swipeLeft = false;
        this.swipeRight = false;
        this.paginationElement.style.transform = 'translate3d(0,0,0)';
        this.changeCarouselTranslateTo(this.translate);
    }

    addStyleOnMobileDevices() {
        if (document.documentElement.offsetWidth < 566) {
            const width = document.documentElement.offsetWidth;
            const paddingForPaging = (width - 240) / 2;
            const paddingForCarousel = (width - 250) / 2;

            this.containerWidth -= paddingForCarousel * 2;

            this.paginationElementContainer.classList.add('pseudo');
            this.container.classList.add('pseudo');

            this.paginationElementContainer.style.padding = `0 ${paddingForPaging}px`;
            this.container.style.padding = `10px ${paddingForCarousel}px`;

            const style = document.createElement('style');
            style.innerHTML = `.pseudo:before {width: ${(width - 252) / 2}px}
                               .pseudo:after {width: ${(width - 252) / 2}px}`;
            document.querySelector('head').appendChild(style);
        } else {
            this.paginationElementContainer.classList.remove('pseudo');
            this.container.classList.remove('pseudo');

            this.paginationElementContainer.style.padding = '';
            this.container.style.padding = '';
        }
    }

    needPreloading() {
        const carouselWidth = this.carousel.children.length * 310;
        let multiplier = this.containerWidth <= 310 ? 4 : 2;
        multiplier = this.containerWidth > 310 && this.containerWidth <= 620 ? 3 : multiplier;

        return Math.abs(this.translate) + this.containerWidth
                 > carouselWidth - (this.containerWidth * multiplier);
    }

    removeTransition() {
        this.carousel.classList.remove('trans-animate');
    }
}
