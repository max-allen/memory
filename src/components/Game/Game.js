import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Navbar from '../Navbar/Navbar'
import Cards from '../Cards/Cards'
import { fetchCards, endTurn, removeCards, editSetting } from '../../store'

class Game extends Component {
  componentDidMount() {
    const { cards } = this.props

    if (!Object.keys(cards).length) {
      this.props.getCards()
    }
  }

  componentDidUpdate() {
    let { selectedCards } = this.props

    if (selectedCards.length === 2) {
      selectedCards = selectedCards.map(card => Object.values(card)[0])
      const firstCard = selectedCards.splice(0, 1)[0]

      if (selectedCards.includes(firstCard)) {
        this.props.removeCards(firstCard)
      } else {
        this.props.endTurn()
      }
    }
  }

  render() {
    const {
      cards,
      store,
      removedCards,
      setting,
      changeSetting,
      gameInProgress,
      gameCompleted,
    } = this.props

    return (
      <div>
        <Navbar
          removedCards={removedCards}
          setting={setting}
          changeSetting={changeSetting}
          gameInProgress={gameInProgress}
          gameCompleted={gameCompleted}
          store={store}
        />

        {cards.length ? <Cards store={store} /> : null}
      </div>
    )
  }
}

Game.propTypes = {
  cards: PropTypes.instanceOf(Array),
  store: PropTypes.instanceOf(Object),
  selectedCards: PropTypes.instanceOf(Array),
  removedCards: PropTypes.instanceOf(Array),
  setting: PropTypes.string,
  changeSetting: PropTypes.func.isRequired,
  getCards: PropTypes.func.isRequired,
  removeCards: PropTypes.func.isRequired,
  endTurn: PropTypes.func.isRequired,
  gameInProgress: PropTypes.bool,
  gameCompleted: PropTypes.bool,
}

const mapState = state => ({
  cards: state.game.cards,
  selectedCards: state.game.selectedCards,
  removedCards: state.game.removedCards,
  setting: state.game.setting,
  gameInProgress: state.game.gameInProgress,
  gameCompleted: state.game.gameCompleted,
})

const mapDispatch = dispatch => ({
  getCards: () => dispatch(fetchCards()),
  endTurn: () => dispatch(endTurn()),
  removeCards: card => dispatch(removeCards(card)),
  changeSetting: e => dispatch(editSetting(e.target.value)),
})

export default connect(mapState, mapDispatch)(Game)
