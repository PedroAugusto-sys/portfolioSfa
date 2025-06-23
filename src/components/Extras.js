import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Extras.css';

const depoimentos = [
  {
    autor: 'Detetive Anônimo',
    texto: '“Nunca vi uma artista transformar mistério em arte como Sofia. Cada obra é um caso resolvido com maestria.”',
  },
  {
    autor: 'Colecionador',
    texto: '“Observar o trabalho de Sofia é como seguir pistas em um labirinto de emoções e cores.”',
  },
];

const diario = [
  'Às vezes, a melhor pista está no detalhe que ninguém vê.',
  'A arte é o maior dos enigmas: quanto mais se investiga, mais se descobre.',
  'Entre luz e sombra, encontro o traço perfeito.',
];

const Extras = ({ soundFiles, playingSounds, toggleSound }) => {
  const depoRef = useRef();
  const diarioRef = useRef();
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    if (depoRef.current) {
      gsap.fromTo(depoRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, delay: 0.5 });
    }
    if (diarioRef.current) {
      gsap.fromTo(diarioRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, delay: 0.7 });
    }
  }, []);

  return (
    <section className="extras-section">
      <h2>Extras</h2>
      <div className="extras-flex">
        <div className="extras-sounds">
          <h3>Arquivo de Evidências Sonoras</h3>
          <div className="sound-buttons">
            {soundFiles.map((sound, index) => (
              <button key={sound.name} onClick={() => toggleSound(sound.file, index, sound.volume)} className={`sound-btn ${playingSounds.has(sound.file) ? 'playing' : ''}`}>
                <span className="sound-icon">{sound.icon}</span>
                {sound.name}
              </button>
            ))}
          </div>
        </div>
        <div className="extras-depo" ref={depoRef}>
          <h3>Depoimentos</h3>
          {depoimentos.map((d, i) => (
            <div key={i} className="depoimento">
              <span className="depo-text">{d.texto}</span>
              <span className="depo-autor">— {d.autor}</span>
            </div>
          ))}
        </div>
        <div className="extras-diario" ref={diarioRef}>
          <h3>Diário de Campo</h3>
          <ul>
            {diario.map((linha, i) => (
              <li key={i}>{linha}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="extras-secret">
        <button className="secret-btn" onClick={() => setShowSecret(s => !s)}>
          {showSecret ? 'Fechar Pista Oculta' : 'Revelar Pista Oculta'}
        </button>
        {showSecret && (
          <div className="secret-content">
            <span role="img" aria-label="lupa">🔎</span> “A verdadeira arte está nos detalhes que só os olhos atentos conseguem desvendar.”
          </div>
        )}
      </div>
    </section>
  );
};

export default Extras; 