import React, { useState, useEffect, useRef, useCallback } from 'react';
import LanternEffect from './components/LanternEffect';
import SwitchLantern from './components/SwitchLantern';
import NeonSign from './components/NeonSign';
import StartButton from './components/StartButton';
import Corkboard from './components/Corkboard';
import ClueMap from './components/ClueMap';
import CaseModal from './components/CaseModal';
import AboutSofia from './components/AboutSofia';
import ContactForm from './components/ContactForm';
import Extras from './components/Extras';
import Lightning from './components/Lightning';
import MuteThunderButton from './components/MuteThunderButton';
import styles from './App.module.css';
import projectsData from './data/projects.json';

const soundFiles = [
  { name: 'Chuva na Madrugada', file: process.env.PUBLIC_URL + '/sounds/chuva.mp3', icon: '🌧️', volume: 0.05 },
  { name: 'Jazz do Clube Secreto', file: process.env.PUBLIC_URL + '/sounds/jazz.mp3', icon: '🎷', volume: 0.8 },
  { name: 'Passos no Beco', file: process.env.PUBLIC_URL + '/sounds/passos.mp3', icon: '👣', volume: 0.6 },
];

function App() {
  const [started, setStarted] = useState(false);
  const [isLanternMode, setIsLanternMode] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [unlockedCases, setUnlockedCases] = useState([]);
  const lightningRef = useRef(null);
  const [isThunderMuted, setIsThunderMuted] = useState(false);
  
  // Controle de áudio centralizado
  const audioRefs = useRef([]);
  const [playingSounds, setPlayingSounds] = useState(new Set());

  const toggleSound = useCallback((soundFile, index, volume) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    setPlayingSounds(prevPlayingSounds => {
      const newPlayingSounds = new Set(prevPlayingSounds);
      if (newPlayingSounds.has(soundFile)) {
        audio.pause();
        newPlayingSounds.delete(soundFile);
      } else {
        audio.volume = volume;
        audio.play();
        newPlayingSounds.add(soundFile);
      }
      return newPlayingSounds;
    });
  }, []);
  
  // Efeito para iniciar os sons quando a investigação começa
  useEffect(() => {
    if (started) {
      // Inicia Jazz, Passos e Chuva com seus volumes definidos
      const jazz = soundFiles[1];
      const passos = soundFiles[2];
      const chuva = soundFiles[0];
      
      toggleSound(jazz.file, 1, jazz.volume);
      toggleSound(passos.file, 2, passos.volume);
      toggleSound(chuva.file, 0, chuva.volume);
    }
  }, [started, toggleSound]);

  // Efeito de raio aleatório
  useEffect(() => {
    let timeout;
    const scheduleLightning = () => {
      const randomInterval = Math.random() * 25000 + 15000; // Entre 15 e 40 segundos
      timeout = setTimeout(() => {
        if (!isThunderMuted && lightningRef.current) {
          lightningRef.current.flash();
        }
        scheduleLightning();
      }, randomInterval);
    };

    scheduleLightning();

    return () => clearTimeout(timeout);
  }, [isThunderMuted]);

  return (
    <LanternEffect isLanternMode={isLanternMode}>
      <Lightning ref={lightningRef} />
      <div className={styles.uiControls}>
        <SwitchLantern isLanternMode={isLanternMode} setIsLanternMode={setIsLanternMode} />
        <MuteThunderButton isMuted={isThunderMuted} setIsMuted={setIsThunderMuted} />
      </div>
      {/* Elementos de áudio agora vivem aqui */}
      {soundFiles.map((sound, index) => (
        <audio
          key={sound.file}
          ref={el => audioRefs.current[index] = el}
          src={sound.file}
          loop
        />
      ))}
      <div className={styles.mainBg}>
        {!started ? (
          <div className={styles.introContainer}>
            <NeonSign />
            <StartButton onClick={() => setStarted(true)} />
          </div>
        ) : (
          <>
            <NeonSign />
            <div className={styles.mainContent}>
              <Corkboard 
                projetos={projectsData}
                isLanternMode={isLanternMode}
                onCaseClick={c => { setSelectedCase(c); setModalOpen(true); }} 
              />
              <ClueMap projetos={projectsData} unlocked={unlockedCases} />
            </div>
            <AboutSofia isLanternMode={isLanternMode} />
            <ContactForm />
            <Extras 
              soundFiles={soundFiles}
              playingSounds={playingSounds}
              toggleSound={toggleSound}
            />
          </>
        )}
        {modalOpen && (
          <CaseModal 
            projeto={selectedCase} 
            onClose={() => {
              console.log('Modal fechado, caso selecionado:', selectedCase);
              setModalOpen(false);
              if (selectedCase && !unlockedCases.includes(selectedCase.id)) {
                console.log('Desbloqueando caso:', selectedCase.id);
                setUnlockedCases([...unlockedCases, selectedCase.id]);
              }
            }} 
          />
        )}
      </div>
    </LanternEffect>
  );
}

export default App; 