import PT from 'prop-types';
import { useCallback, useEffect } from 'react';
import s from './Modal.module.css';

export default function Modal({ imgUrl, toggleModal }) {
  const onKeydown = useCallback(
    e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [onKeydown]);

  const onClikOverlay = e => {
    if (e.target !== e.currentTarget) return;

    toggleModal();
  };

  return (
    <div onClick={onClikOverlay} className={s.overlay}>
      <div className={s.modal}>
        <img src={imgUrl} alt="img" />
      </div>
    </div>
  );
}
Modal.propTypes = {
  imgUrl: PT.string.isRequired,
  toggleModal: PT.func.isRequired,
};
