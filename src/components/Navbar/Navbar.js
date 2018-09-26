import React from 'react'
import Timer from '../Timer/Timer'
import styles from './Navbar.scss'

const Navbar = (props) =>  {
  const { removedCards, setting, changeSetting, gameInProgress, store, lastTimeElapsed } = props

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Memory!</h1>

      { gameInProgress &&
        <div styles={styles.timerContainer}>
          <p className={styles.timerLabel}>Timer: </p>
          <Timer key={setting} store={store} />
        </div>
      }

    <div>
      <p styles={styles.dropdownLabel}>Game Difficulty:</p>
      <select className={styles.dropdown} onChange={changeSetting}>
        {['easy', 'hard'].map(level => {
          return (
            <option key={level.toString()} defaultValue={setting}>{level}</option>
          )
        })
        }
      </select>
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
