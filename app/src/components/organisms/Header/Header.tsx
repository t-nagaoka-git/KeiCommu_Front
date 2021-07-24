import styles from './styles.module.css';
import {Logo} from './Logo';
import {Nav} from './Nav';
import React from 'react';

function HeaderBase() {
  return (
    <div className={styles.module}>
      <Logo />
      <Nav />
    </div>
  );
}

export const Header = React.memo(HeaderBase);
