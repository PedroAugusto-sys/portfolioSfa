import React from 'react';
import styles from './SwitchLantern.module.css';

const SwitchLantern = ({ isLanternMode, setIsLanternMode }) => (
  <label className={styles.switchLantern} title="Ligar/desligar luz">
    <input
      type="checkbox"
      checked={!isLanternMode}
      onChange={() => setIsLanternMode(!isLanternMode)}
      aria-checked={!isLanternMode}
      aria-label="Luz geral"
    />
    <span className={styles.slider} />
    <span className={styles.switchLabelText}>Luz</span>
  </label>
);

export default SwitchLantern; 