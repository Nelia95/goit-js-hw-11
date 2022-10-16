export function createMarkup(photos) {
  return photos
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="photo-link" href='${largeImageURL}'><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo" />
  <div class="info">
    <p class="info-item">
      <b class="info-item-text">Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b class="info-item-text">Views ${views}</b>
    </p>
    <p class="info-item">
      <b class="info-item-text">Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b class="info-item-text">Downloads ${downloads}</b>
    </p>
  </div>
</div></a>`;
      }
    )
    .join('');
}
