import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import LoadingSpinner from './Loader';

const App = () => {
  const [key] = useState("42280985-7d985928ef43c44dee148ab18");
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(1);

    try {
      const response = await axios.get(`https://pixabay.com/api/?q=${query}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
      setImages(response.data.hits);
    } catch (error) {
      console.error('Error fetching images: ', error);
    }

    setLoading(false);
  }, [query, key]);

  const loadMoreImages = useCallback(async () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);

    try {
      const response = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page + 1}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
      setImages(prevImages => [...prevImages, ...response.data.hits]);
    } catch (error) {
      console.error('Error fetching more images: ', error);
    }

    setLoading(false);
  }, [query, page, key]);

  const openModal = useCallback((image) => {
    setShowModal(true);
    setModalImage(image.largeImageURL);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalImage('');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        setLoading(true);
        setPage(1);

        try {
          const response = await axios.get(`https://pixabay.com/api/?q=${query}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
          setImages(response.data.hits);
        } catch (error) {
          console.error('Error fetching images: ', error);
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [query, key]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [closeModal]);

  return (
    <div>
      <Searchbar setQuery={setQuery} onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {loading && <LoadingSpinner />}
      {images.length > 0 && <Button onClick={loadMoreImages} />}
      {showModal && <Modal closeModal={closeModal} modalImage={modalImage} />}
    </div>
  );
};

export default App;

