import React from 'react';
import s from './Button.module.css';

export default function Button({loadMore}) {
  return (
    <button onClick={() => loadMore()} className={s.button} type="button">
      Load more
    </button>
  );
}
