/* eslint-disable no-lonely-if */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from './Timer.scss'

export const formatTime = time => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}

function Timer({ gameInProgress }) {
  const [secondsElapsed, setSecondsElapsed] = useState(0)

  useEffect(
    () => {
      if (gameInProgress) {
        const interval = setInterval(() => {
          setSecondsElapsed(secondsElapsed + 1)
        }, 1000)
        return () => clearInterval(interval)
      }
    },
    [gameInProgress, secondsElapsed]
  )
  return <div className={styles.timer}>{formatTime(secondsElapsed)}</div>
}

const mapState = ({ game: { gameInProgress } }) => ({ gameInProgress })

Timer.propTypes = {
  gameInProgress: PropTypes.bool,
}

export default connect(mapState)(Timer)
