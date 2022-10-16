import { PixabayApi } from './js/fetchClass';
import { refs } from './js/refs';
import { createMarkup } from './js/createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const pixabay = new PixabayApi();

async function searchPhotos(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  if (!searchQuery) {
    Notify.failure('Enter data to search, please!');
    return;
  }
  pixabay.query = searchQuery;
  clearPage();

  try {
    const { hits, total } = await pixabay.getPhotos();
    if (hits.length === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const markup = createMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    pixabay.calculateTotalPages(total);

    Notify.success(`Hooray! We found ${total} images.`);

    if (pixabay.isShowLoadMore) {
      refs.loadMoreBtn.classList.remove('.is-hidden');
    }
  } catch (error) {
    Notify.failure(error.message);
    clearPage();
  }
}
const onLoadMore = async () => {
  pixabay.incrementPage();
  if (!pixabay.isShowLoadMore) {
    refs.loadMoreBtn.classList.add('.is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  try {
    const { hits } = await pixabay.getPhotos();
    const markup = createMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    Notify.failure(error.message);
    clearPage();
  }
};

refs.form.addEventListener('submit', searchPhotos);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function clearPage() {
  pixabay.resetPage();
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('.is-hidden');
}
