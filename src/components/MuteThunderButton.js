import React from 'react';
import styles from './MuteThunderButton.module.css';

const MuteThunderButton = ({ isMuted, setIsMuted }) => (
  <label className={styles.muteThunder} title="Ligar/desligar trovões">
    <input
      type="checkbox"
      checked={!isMuted}
      onChange={() => setIsMuted(!isMuted)}
      aria-checked={!isMuted}
      aria-label="Trovões"
    />
    <span className={styles.slider} />
    <span className={styles.switchLabelText}>Trovão</span>
  </label>
);

export default MuteThunderButton; 