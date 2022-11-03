import PT from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import s from './ImageGallery.module.css';

export default function ImageGallery({ items, onClickCard }) {
  return (
    <ul className={s.imageGallery}>
      {items.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClickCard={onClickCard}
          />
        );
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  items: PT.array.isRequired,
  onClickCard: PT.func.isRequired,
};
