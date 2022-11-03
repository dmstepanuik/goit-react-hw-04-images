import PT from 'prop-types';
import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  onClickCard,
}) {
  
  return (
    <li className={s.imageGalleryItem}>
      <img
        onClick={() => onClickCard(largeImageURL)}
        className={s.imageGalleryItemImage}
        src={webformatURL}
        alt="img"
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  id: PT.number.isRequired,
  webformatURL: PT.string.isRequired,
  largeImageURL: PT.string.isRequired,
  onClickCard: PT.func.isRequired,
};
