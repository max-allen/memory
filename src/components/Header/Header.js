import React from 'react'
import PropTypes from 'prop-types'
import Timer from '../Timer/Timer'
import styles from './Header.scss'

const Header = props => {
  const { removedCards, setting, changeSetting, gameCompleted, store } = props

  return (
    <div className={styles.container}>
      <p className={styles.dropdownLabel}>Game Difficulty:</p>
      <select className={styles.dropdown} onChange={changeSetting}>
        {['easy', 'hard'].map(level => (
          <option key={level.toString()} defaultValue={setting}>
            {level}
          </option>
        ))}
      </select>

      <div className={styles.timerContainer}>
        <p className={styles.timerLabel}>Timer: </p>
        <Timer key={setting} store={store} />
      </div>

      {Object.keys(removedCards).length
        ? Object.keys(removedCards).map(idx => (
            <div key={idx} className={styles.cards}>
              {removedCards[idx]}
            </div>
          ))
        : null}

      {gameCompleted && <p>Game Over! Refresh your browser to play again!</p>}
    </div>
  )
}

Header.propTypes = {
  store: PropTypes.instanceOf(Object),
  removedCards: PropTypes.instanceOf(Array),
  setting: PropTypes.string,
  changeSetting: PropTypes.func.isRequired,
  gameCompleted: PropTypes.bool,
}

export default Header
