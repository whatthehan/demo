import React from 'react';

interface TextProps {
  text: string;
}

function Text({ text }: TextProps) {
  return (
    <div>{text}</div>
  );
}

export default Text;
