import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import './Lightning.css';

const Lightning = forwardRef((props, ref) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const audioRef = useRef(null);

  useImperativeHandle(ref, () => ({
    flash: () => {
      setIsFlashing(true);
      if (audioRef.current) {
        audioRef.current.volume = 0.6;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Erro ao tocar som do trovão:", e));
      }
      setTimeout(() => {
        setIsFlashing(false);
      }, 400);
    },
  }));

  return (
    <>
      <div className={`lightning-flash ${isFlashing ? 'flashing' : ''}`}></div>
      <audio ref={audioRef} src={process.env.PUBLIC_URL + '/sounds/lightning.mp3'} preload="auto" />
    </>
  );
});

export default Lightning; 