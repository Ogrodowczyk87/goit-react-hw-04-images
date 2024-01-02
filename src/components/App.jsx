import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import fetchPixabay from "services/pixabayService";

import ImageGallery from "./ImageGallery/ImageGallery";
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/Error";
import Modal from "./Modal/Modal";


const App = () => {

  const [modal, setModal] = useState({ isOpen: false, largeImageURL: '' });
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();


  // componentDidUpdate = async (_, prevState) => {
  //   const { searchQuery, currentPage } = this.state;
  //   if (searchQuery !== prevState.searchQuery || currentPage !== prevState.currentPage) {
  //     this.fetchImages(searchQuery, currentPage);
  //   }
  // }
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const onSubmitSearch = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
    setTotalImages(0);
  };

  // first search
  // onSubmitSearch = (query) => {
  //   this.setState({
  //     searchQuery: query,
  //     images: [],
  //     currentPage: 1
  //   });
  // }


  //uploading more pages
  // onPageUpload = () => {
  //   this.setState((prev) => ({
  //     currentPage: prev.currentPage + 1,
  //   }));
  // }

  const onPageUpload = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const fetchImages = async (query, page) => {
    try {
      setLoading(true);

      const data = await fetchPixabay(query, page);

      if (data.totalHits === 0) {
        Notiflix.Notify.warning(
          `There is no results upon your ${query}, please try again...`
        );
        return;
      }


      setImages(prevState => {
        return [...prevState, ...data.hits];
      });

      setTotalImages(data.totalHits);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };



  //set up modal
  // onModalOpen = (data) => {
  //   this.setState({
  //     modal: {
  //       isOpen: true,
  //       largeImageURL: data
  //     },
  //   });
  // };
  const onModalOpen = data => {
    setModal({
      isOpen: true,
      largeImageURL: data,
    });
  };

  const onModalClose = () => {
    setModal({
      isOpen: false,
      largeImageURL: '',
    });
  };

  const showBtn = !loading && images.length !== totalImages;

  return (
    <div>
      <SearchBar onSubmit={onSubmitSearch} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onModalOpen={onModalOpen} />
      )}
      {error && <ErrorMessage />}

      {showBtn && <Button onPageUpload={onPageUpload} />}

      {modal.isOpen && (
        <Modal
          largeImageURL={modal.largeImageURL}
          onModalClose={onModalClose}
        />
      )}
    </div>
  );
};

export default App;