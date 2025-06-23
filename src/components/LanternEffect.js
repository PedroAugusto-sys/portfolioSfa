import React, { useRef, useEffect } from 'react';
import './LanternEffect.css';

const LanternEffect = ({ children, isLanternMode }) => {
  const lanternRef = useRef();

  useEffect(() => {
    const moveLantern = (e) => {
      if (!isLanternMode) {
        document.documentElement.style.removeProperty('--lx');
        document.documentElement.style.removeProperty('--ly');
        return;
      }
      
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      
      document.documentElement.style.setProperty('--lx', `${x}px`);
      document.documentElement.style.setProperty('--ly', `${y}px`);
    };

    window.addEventListener('mousemove', moveLantern);
    window.addEventListener('touchstart', moveLantern, { passive: false });
    window.addEventListener('touchmove', moveLantern, { passive: false });

    // Set initial position
    moveLantern({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

    return () => {
      window.removeEventListener('mousemove', moveLantern);
      window.removeEventListener('touchstart', moveLantern);
      window.removeEventListener('touchmove', moveLantern);
    };
  }, [isLanternMode]);

  return (
    <div className="lantern-effect" ref={lanternRef}>
      <div className={`lantern-overlay ${!isLanternMode ? 'full-light' : ''}`} />
      {children}
    </div>
  );
};

export default LanternEffect;