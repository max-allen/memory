import React from 'react'
import { connect } from 'react-redux'
import { recordElapsedTime } from '../../store'
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

const Timer = ({ time = 0 }) => <div className={styles.timer}>{formatTime(time)}</div>

Timer.propTypes = {
  time: PropTypes.number,
}

class TimerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsElapsed: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.gameInProgress) {
      if (!prevProps.gameInProgress) {
        this.interval = setInterval(this.tick.bind(this), 1000)
      }
    } else {
      if (prevProps.gameInProgress) clearInterval(this.interval)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1,
    })
  }

  render() {
    return <Timer time={this.state.secondsElapsed} />
  }
}

const mapState = state => {
  return {
    gameInProgress: state.game.gameInProgress,
  }
}

export default connect(mapState)(TimerContainer)
