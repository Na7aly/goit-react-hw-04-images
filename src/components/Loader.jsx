
import React from 'react';
import styles  from "../components/App.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;