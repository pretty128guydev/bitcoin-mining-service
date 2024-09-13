// TextAnimation.tsx
import React from 'react';
import './TextAnimation.css';

interface TextAnimationProps {
  text: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text }) => {
  return (
    <div className="text-animation">
      {text.split("").map((char, index) => (
        <span key={index} className="animated-char" style={{ animationDelay: `${index * 0.1}s` }}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default TextAnimation;
