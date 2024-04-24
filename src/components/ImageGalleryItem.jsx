
import React from 'react';
import css from '../components/App.module.css';

const ImageGalleryItem = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={handleClick}>
      <img src={image.webformatURL} alt="" className={css['ImageGalleryItem-image']} />
    </li>
  );
};

export default ImageGalleryItem;