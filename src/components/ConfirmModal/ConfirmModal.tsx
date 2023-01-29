import { FC, useEffect } from 'react';
import useConfirm from '../../hooks/useConfirm';
import styles from './ConfirmModal.module.scss';

type ConfirmModalProps = {};

const ConfirmModal: FC<ConfirmModalProps> = () => {
  const { handleConfirm, handleCancel, confirmState } = useConfirm();

  useEffect(() => {
    function handleKeyup(evt: any) {
      if (evt.key === 'Escape') {
        handleCancel();
      }
      if (evt.key === 'Enter') {
        handleConfirm();
      }
    }

    confirmState.show && document.addEventListener('keyup', handleKeyup);
    return () => document.removeEventListener('keyup', handleKeyup);
  }, [confirmState.show]);

  useEffect(() => {
    let bodyStyle = document.body.style;
    confirmState.show ? (bodyStyle.overflow = 'hidden') : (bodyStyle.overflow = 'initial');
  }, [confirmState.show]);

  const component = confirmState.show && (
    <div className={styles.overlay}>
      <div className={styles.dialogContainer}>
        <p className={styles.text}>{confirmState?.text && confirmState.text}</p>
        <div className={styles.buttonsContainer}>
          <button type="button" className={styles.button} onClick={handleConfirm}>
            Да
          </button>
          <button type="button" className={styles.button} onClick={handleCancel}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
  return component || null;
};

export default ConfirmModal;
