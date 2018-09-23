import React, { Component } from 'react'

import Timer from '../Timer/Timer'
import Navbar from '../Navbar/Navbar'
import Cards from '../Cards/Cards'
import styles from './Game.scss'
import axios from 'axios'

export default class Game extends Component {
  constructor() {
    super()

    this.state = {
      setting: 'easy',
      cards: {},
      selectedCards: {},
      removedCards: {},
      resetTurn: false,
    }

    this.updateSelected = this.updateSelected.bind(this)
  }

  componentDidMount() {
    axios
      .get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
      .then(resp => resp.data)
      .then(data => this.setState({ cards: data.levels }))
  }

  componentDidUpdate() {
    let { selectedCards, resetTurn } = this.state
    let { removedCards } = this.state

    if (resetTurn) this.setState({ resetTurn: false })

    const cardKeys = Object.keys(selectedCards)
    const cardValues = Object.values(selectedCards)

    if (cardValues.length === 2) {
      if (cardValues[0] === cardValues[1]) {
        removedCards = Object.assign({}, removedCards, selectedCards)
        selectedCards = {}

        this.setState({ removedCards, selectedCards })
      } else {
        selectedCards = {}
        resetTurn = true

        this.setState({ selectedCards, resetTurn })
      }
    }
  }

  updateSelected(card) {
    const { selectedCards } = this.state
    const ids = Object.keys(selectedCards)

    const nextId = Object.keys(card)[0]

    if (!ids.includes(nextId)) {
      selectedCards[nextId] = card[nextId]

      this.setState({ selectedCards })
    }
  }

  render() {
    const { cards, setting, removedCards, resetTurn } = this.state

    return (
      <div>
        <Navbar />
        {this.state.cards.length && (
          <Cards data={cards.filter(level => level.difficulty === setting)[0].cards} updateSelected={this.updateSelected} resetTurn={resetTurn} />
        )}
      </div>
    )
  }
}
