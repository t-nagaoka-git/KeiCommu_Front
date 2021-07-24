import React from 'react';
import styles from './styles.module.css';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputPassword: React.FC<Props> = ({className = '', type = 'password', ...props}) => (
  <input {...props} type={type} className={`${className} ${styles.input}`} />
);
