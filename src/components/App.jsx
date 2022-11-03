import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import './styles.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { useState } from 'react';
import { itemsApi } from 'services/ItemsApi';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import s from './App.module.css';

export function App() {
  
  const [items, setItems] = useState([]);
  const [showedModal, setShowedModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickCard = imgUrl => {
    setModalImg(imgUrl);
    toggleModal();
  };

  function toggleModal() {
    setShowedModal(prevState => !prevState);
  }

  const onChangeSearch = async value => {
    itemsApi.resetPage();

    setLoading(true);
    const { data } = await itemsApi.fetchItems(value).catch(e => {
      Notify.failure(e.message);
    });

    setLoading(false);

    setItems(data.hits);
  };

  const loadMore = async () => {

    setLoading(true)
    itemsApi.incrementPage();
    const { data } = await itemsApi.fetchItems().catch(e => {
      Notify.failure(e.message);
    });

    setLoading(false)


    setItems(prev => [...prev, ...data.hits]);
  };

  const isLastPage = itemsApi?.isLastPage();
  return (
    <>
      <Searchbar onChangeSearch={onChangeSearch} />
      <ImageGallery onClickCard={onClickCard} items={items} />
      {loading && (
        <div className={s.loader}>
          <Loader />
        </div>
      )}
      {!isLastPage && !loading && (
        <div className={s.moreBtn}>
          <Button loadMore={loadMore} />
        </div>
      )}
      {showedModal && (
        <Modal imgUrl={modalImg} toggleModal={toggleModal} />
      )}
    </>
  );
}
