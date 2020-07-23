import React, { useContext } from 'react';
import { Context } from '../store';

const Link = (props) => {
  const { to, ...rest } = props;
  const { type, onChange } = useContext(Context);

  const onClick = (e) => {
    e.preventDefault();
    window.history.pushState(null, '', to);
    onChange();
  };

  if (type === 'default') {
    return (
      <a {...rest} style={{ color: '#1890FF' }} onClick={onClick}>
        {rest.children}
      </a>
    );
  }
  return (
    <a href={`#${to}`} {...rest}>
      {rest.children}
    </a>
  );
};

export default Link;
