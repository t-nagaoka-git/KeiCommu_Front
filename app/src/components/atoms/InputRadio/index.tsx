import React from 'react';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputRadio: React.FC<Props> = ({className = '', type = 'radio', ...props}) => (
  <input {...props} type={type} className={`${className}`} />
);
