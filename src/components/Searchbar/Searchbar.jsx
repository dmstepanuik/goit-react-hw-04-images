import { BsSearch } from 'react-icons/bs';
import s from './Searchbar.module.css';

export default function Searchbar({ onChangeSearch }) {
  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;

    onChangeSearch(form.elements.search.value);
  };
  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.searchFormButton}>
          <BsSearch/>
          <span className={s.searchFormButtonLabel}>Search</span>
        </button>

        <input
          name="search"
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
