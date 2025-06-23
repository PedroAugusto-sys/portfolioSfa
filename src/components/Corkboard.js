import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Corkboard.css';

const Corkboard = ({ projetos = [], onCaseClick, isLanternMode }) => {
  const boardRef = useRef();
  const cardsRef = useRef([]);

  // Debug log
  console.log('Corkboard renderizado com projetos:', projetos.length);

  useEffect(() => {
    if (boardRef.current) {
      gsap.fromTo(
        boardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.8, rotation: gsap.utils.random(-5, 5), y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 0.2 + index * 0.1, ease: 'back.out(1.2)' }
          );
        }
      });
    }
  }, [projetos.length]);

  const handleCaseClick = (project) => {
    console.log('Corkboard: clique no caso:', project);
    onCaseClick(project);
  };

  return (
    <div className={`corkboard-container ${isLanternMode ? 'lantern-mode' : 'full-light-mode'}`} ref={boardRef}>
      <div className="corkboard">
        {projetos.map((project, index) => (
          <div
            key={project.id}
            className="case-card"
            ref={el => cardsRef.current[index] = el}
            onClick={() => handleCaseClick(project)}
          >
            <div className="pin"></div>
            <img
              src={process.env.PUBLIC_URL + '/images/' + project.imagem}
              alt={project.titulo}
              className="case-image"
            />
            <div className="case-info">
              <h3>{project.titulo}</h3>
              <p>{project.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Corkboard;