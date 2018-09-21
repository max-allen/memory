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
    }
  }

  componentDidMount() {
    axios
      .get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
      .then(resp => resp.data)
      .then(data => this.setState({ cards: data.levels }))
  }

  render() {
    const { cards, setting } = this.state

    return (
      <div>
        <Navbar />
        {this.state.cards.length && (
          <Cards data={cards.filter(level => level.difficulty === setting)[0].cards} />
        )}
      </div>
    )
  }
}
