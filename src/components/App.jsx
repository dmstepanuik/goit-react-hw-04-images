import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import './styles.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Component } from 'react';
import { itemsApi } from 'services/ItemsApi';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import s from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    items: [],
    showedModal: false,
    modalImg: '',
    loading: false,
  };

  onClickCard = imgUrl => {
    this.setState({ modalImg: imgUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        showedModal: !prevState.showedModal,
      };
    });
  };

  onChangeSearch = async value => {
    itemsApi.resetPage();
    this.setState({ loading: true });
    const { data } = await itemsApi.fetchItems(value).catch(e => {
      Notify.failure(e.message);
    });
    this.setState({ loading: false });
    this.setState({ items: data.hits });
  };

  loadMore = async () => {
    this.setState({ loading: true });
    itemsApi.incrementPage();
    const { data } = await itemsApi.fetchItems().catch(e => {
      Notify.failure(e.message);
    });
    this.setState({ loading: false });
    this.setState(prev => ({ items: [...prev.items, ...data.hits] }));
  };

  render() {
    const { items, modalImg, showedModal, loading } = this.state;
    const isLastPage = itemsApi?.isLastPage();
    return (
      <>
        <Searchbar onChangeSearch={this.onChangeSearch} />
        <ImageGallery onClickCard={this.onClickCard} items={items} />
        {loading && (
          <div className={s.loader}>
            <Loader />
          </div>
        )}
        {!isLastPage && !loading && (
          <div className={s.moreBtn}>
            <Button loadMore={this.loadMore} />
          </div>
        )}
        {showedModal && (
          <Modal imgUrl={modalImg} toggleModal={this.toggleModal} />
        )}
      </>
    );
  }
}
