export default function clearToInitialState(carousel, pagination, handler) {
    carousel.clear();
    pagination.clear();
    handler.clearCarouselProperties();
}
