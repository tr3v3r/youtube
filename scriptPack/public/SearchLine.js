export default class SearchLine {
    constructor() {
        this.formElement = null;
        this.inputElement = null;
        this.labelElelement = null;
    }

    render() {
        const header = document.createElement('header');
        header.className = 'container';
        header.innerHTML = `<form class="search-form" action="">   
                            <input type="text" name="" onfocus = "this.select();"  required placeholder = 'Search video'>
                            <button  class="mini-btn"><i class="fa fa-search" aria-hidden="true"></i></button>
                            <button class="main-btn">Search</button>     
                            </form>`;
        document.querySelector('.search-line-wrapper').appendChild(header);

        this.formElement = document.querySelector('.search-form');
        this.inputElement = this.formElement.querySelector('input');
        this.labelElelement = this.formElement.querySelector('label');
    }
}
