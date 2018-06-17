export default class Pagination {
    constructor() {
        this.paginationContainerElement = null;
        this.nextPageNumber = 1;
        this.paginationElement = null;
        this.previousPage = null;
        this.buttonToLeft = null;
        this.buttonToRight = null;
    }

    render() {
        const footer = this.createElement('footer', 'pagination-container');
        const ul = this.createElement('ul', 'pagination');
        const btnLeft = this.createElement('button', 'btn btn-left-page', '<i class="fa fa-angle-left" aria-hidden="true"></i>');
        const btnRight = this.createElement('button', 'btn btn-right-page', '<i class="fa fa-angle-right" aria-hidden="true"></i>');

        footer.appendChild(btnLeft);
        footer.appendChild(ul);
        footer.appendChild(btnRight);
        document.querySelector('.slider-wrapper').appendChild(footer);

        this.buttonToLeft = btnLeft;
        this.buttonToRight = btnRight;
        this.paginationContainerElement = footer;
        this.paginationElement = ul;
    }

    addPage(amountOfElements) {
        for (let i = 0; i < amountOfElements; i++) {
            const li = this.createElement('li', '', this.nextPageNumber);

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

    createElement(tag, className, innerHtml = '') {
        const elem = document.createElement(tag);
        elem.className = className;
        elem.innerHTML = innerHtml;
        return elem;
    }

    clear() {
        this.paginationElement.innerHTML = '';
        this.nextPageNumber = 1;
        this.buttonToLeft.classList.remove('btn-visibility');
        this.buttonToRight.classList.remove('btn-visibility');
        this.paginationContainerElement.style.width = '';
    }
}
