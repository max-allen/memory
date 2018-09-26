import React from 'react'
import Timer from '../Timer/Timer'
import styles from './Navbar.scss'

const Navbar = props => {
  const { removedCards, setting, changeSetting, gameInProgress, gameCompleted, store, lastTimeElapsed } = props



  return (
    <div className={styles.container}>
      <label className={styles.dropdownLabel}>Game Difficulty:</label>
      <select className={styles.dropdown} onChange={changeSetting}>
        {['easy', 'hard'].map(level => {
          return (
            <option key={level.toString()} defaultValue={setting}>{level}</option>
          )
        })
        }
      </select>

      
      <div className={styles.timerContainer}>
        <p className={styles.timerLabel}>Timer: </p>
        <Timer key={setting} store={store} />
      </div>

      {Object.keys(removedCards).length ?
        Object.keys(removedCards).map((idx) => {
          return (
            <div key={idx} className={styles.cards}>{removedCards[idx]}</div>
          )
        })
      : null
    }

    </div>
  )
  
}


export default Navbar
