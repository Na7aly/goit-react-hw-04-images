
import React from 'react';
import styles from '../components/App.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={styles.btn}>
      <button className={styles.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default Button;