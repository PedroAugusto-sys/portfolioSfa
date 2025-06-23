import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import './CaseModal.css';

const openSound = new Howl({
  src: [process.env.PUBLIC_URL + '/sounds/papel-abrindo.mp3'],
  volume: 0.4,
});

const CaseModal = ({ projeto, onClose }) => {
  const modalRef = useRef();

  // Debug log
  console.log('CaseModal renderizado com projeto:', projeto);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, filter: 'blur(12px)' },
        { opacity: 1, scale: 1, filter: 'blur(0)', duration: 0.7, ease: 'power3.out' }
      );
      openSound.play();
    }
  }, [projeto]);

  if (!projeto) {
    console.log('CaseModal: nenhum projeto fornecido');
    return null;
  }

  return (
    <div className="case-modal-bg" onClick={onClose}>
      <div className="case-modal-content" ref={modalRef} onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        <div className="modal-img-wrap">
          <img className="modal-img" src={process.env.PUBLIC_URL + '/images/' + projeto.imagem} alt={projeto.titulo} />
        </div>
        <h3 className="modal-title">{projeto.titulo}</h3>
        <p className="modal-desc">{projeto.descricao}</p>
      </div>
    </div>
  );
};

export default CaseModal; 