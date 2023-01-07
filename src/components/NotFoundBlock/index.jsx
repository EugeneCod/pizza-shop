import React from 'react'

import styles from './NotFoundBlock.module.scss';
console.log(styles);

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.errorDescription}>Страница не найдена</p>
    </div>
  )
}

export default NotFoundBlock