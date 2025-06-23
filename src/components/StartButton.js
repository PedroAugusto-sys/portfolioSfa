import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const StartButton = ({ onClick }) => {
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
      );
      gsap.to(btnRef.current, {
        boxShadow: '0 0 24px #ff2a2a, 0 0 40px #b30000',
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut',
      });
    }
  }, []);

  return (
    <button ref={btnRef} className="neon-btn noir-btn" onClick={onClick}>
      Começar a Investigação
    </button>
  );
};

export default StartButton; 