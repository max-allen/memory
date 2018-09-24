import React, { Component } from 'react'

import Timer from '../Timer/Timer'
import Navbar from '../Navbar/Navbar'
import Cards from '../Cards/Cards'
import styles from './Game.scss'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchCards, endTurn, removeCards, editSetting } from '../../store'

class Game extends Component {
  constructor() {
    super()

    this.state = {
      removedCards: {},
      gameOver: false,
    }
  }

  componentDidMount() {
    const { cards } = this.props

    if (!Object.keys(cards).length) {
      this.props.getCards()
    }
  }

  componentDidUpdate(prevProps) {
    let { selectedCards } = this.props

    if (selectedCards.length === 2) {
      selectedCards = selectedCards.map((card) => { return Object.values(card)[0] })
      let firstCard = selectedCards.splice(0, 1)[0]

      if (selectedCards.includes(firstCard)) {
        this.props.removeCards(firstCard)
      } else {
        this.props.endTurn()
      }
    }
  }

  render() {
    const { cards, store, removedCards, setting, changeSetting, gameInProgress } = this.props

    return (
      <div>
        <Navbar removedCards={removedCards} setting={setting} changeSetting={changeSetting} gameInProgress={gameInProgress} />

        {cards.length && (
          <Cards store={store} />
        )}

        {this.state.gameOver &&
          <div>Game Over!</div>
        }

      </div>
    )
  }
}

const mapState = state => {
  return {
    cards: state.game.cards,
    selectedCards: state.game.selectedCards,
    removedCards: state.game.removedCards,
    setting: state.game.setting,
    gameInProgress: state.game.gameInProgress,
  }
}

const mapDispatch = dispatch => {
  return {
    getCards: () => {
      return dispatch(fetchCards())
    },
    endTurn: () => {
      return dispatch(endTurn())
    },
    removeCards: card => {
      return dispatch(removeCards(card))
    },

    changeSetting: e => {
      return dispatch(editSetting(e.target.value))
    },
  }
}

export default connect(mapState, mapDispatch)(Game)
