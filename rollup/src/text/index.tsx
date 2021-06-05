import React from 'react';
import styles from './style.module.less';

interface TextProps {
  text: string;
}

function Text({ text }: TextProps) {
  return <div className={styles.text}>{text}</div>;
}

export default Text;
