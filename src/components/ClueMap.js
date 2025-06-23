import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ClueMap.css';

const ClueMap = ({ projetos = [], unlocked = [] }) => {
  const pointsRef = useRef([]);
  const linesRef = useRef([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [previousUnlocked, setPreviousUnlocked] = useState([]);

  // Debug logs
  console.log('ClueMap renderizado com:', { projetos: projetos.length, unlocked });

  useEffect(() => {
    // Animação dos pontos
    pointsRef.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0.7, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 0.7, delay: i * 0.08, ease: 'back.out(2)' }
        );
      }
    });
    // Animação das linhas
    linesRef.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { strokeDasharray: 100, strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 1, delay: i * 0.12, ease: 'power2.out' }
        );
      }
    });
  }, [projetos.length]);

  // Efeito especial quando uma nova pista é desbloqueada
  useEffect(() => {
    // Verifica se há novas pistas desbloqueadas
    const newUnlocked = unlocked.filter(id => !previousUnlocked.includes(id));
    
    if (newUnlocked.length > 0) {
      // Animação de destaque para pistas recém-desbloqueadas
      newUnlocked.forEach(id => {
        const projectIndex = projetos.findIndex(p => p.id === id);
        if (projectIndex !== -1 && pointsRef.current[projectIndex]) {
          gsap.to(pointsRef.current[projectIndex], {
            scale: 1.5,
            duration: 0.6,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 2
          });
        }
      });
    }
    
    setPreviousUnlocked([...unlocked]);
  }, [unlocked, projetos, previousUnlocked]);

  // Se não há projetos, mostrar um estado vazio
  if (!projetos || projetos.length === 0) {
    return (
      <div className="clue-map">
        <div className="clue-map-label">Carregando Mapa de Pistas...</div>
      </div>
    );
  }

  // Layout circular
  const R = 110;
  const cx = 140, cy = 140;
  const angleStep = (2 * Math.PI) / projetos.length;
  const points = projetos.map((_, i) => [
    cx + R * Math.cos(i * angleStep - Math.PI / 2),
    cy + R * Math.sin(i * angleStep - Math.PI / 2),
  ]);

  return (
    <div className="clue-map">
      <svg width={280} height={280}>
        {/* Linhas conectando pontos */}
        {points.map((p, i) => (
          <line
            key={`line-${i}`}
            ref={el => (linesRef.current[i] = el)}
            x1={points[i][0]}
            y1={points[i][1]}
            x2={points[(i + 1) % points.length][0]}
            y2={points[(i + 1) % points.length][1]}
            stroke="#bfa77a"
            strokeWidth={3}
            opacity={0.5}
          />
        ))}
        {/* Pontos */}
        {points.map(([x, y], i) => {
          const isUnlocked = unlocked.includes(projetos[i]?.id);
          const project = projetos[i];
          console.log(`Ponto ${i}: projeto ${project?.id}, unlocked: ${isUnlocked}`);
          
          return (
            <g key={`point-${i}`}>
              {/* Círculo de fundo para hover */}
              <circle
                cx={x}
                cy={y}
                r={isUnlocked ? 18 : 14}
                fill="transparent"
                stroke="transparent"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              />
              {/* Ponto principal */}
              <circle
                ref={el => (pointsRef.current[i] = el)}
                cx={x}
                cy={y}
                r={isUnlocked ? 13 : 9}
                fill={isUnlocked ? '#ff2a2a' : '#bfa77a'}
                stroke="#fffbe6"
                strokeWidth={isUnlocked ? 4 : 2}
                opacity={isUnlocked ? 1 : 0.7}
                className={isUnlocked ? 'unlocked-point' : 'locked-point'}
              />
              {/* Efeito de brilho para pontos desbloqueados */}
              {isUnlocked && (
                <circle
                  cx={x}
                  cy={y}
                  r={isUnlocked ? 16 : 12}
                  fill="transparent"
                  stroke="#ff2a2a"
                  strokeWidth={1}
                  opacity={0.6}
                  className="glow-effect"
                />
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Tooltip informativo */}
      {hoveredPoint !== null && projetos[hoveredPoint] && (
        <div className="clue-tooltip">
          <h4>{projetos[hoveredPoint].titulo}</h4>
          <p>{unlocked.includes(projetos[hoveredPoint].id) ? '✅ Pista Desbloqueada' : '🔒 Pista Bloqueada'}</p>
        </div>
      )}
      
      <div className="clue-map-label">
        Mapa de Pistas ({unlocked.length}/{projetos.length})
        {unlocked.length > 0 && (
          <div className="progress-indicator">
            <div 
              className="progress-bar" 
              style={{ width: `${(unlocked.length / projetos.length) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClueMap; 