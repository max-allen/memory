/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import Cards from '../Cards/Cards'
import { fetchCards, endTurn, removeCards, editSetting } from '../../store'

function Game({
  cards,
  selectedCards,
  getCards,
  store,
  removeCards,
  removedCards,
  setting,
  changeSetting,
  endTurn,
  gameCompleted,
}) {
  const checkPair = () => {
    selectedCards = selectedCards.map(card => Object.values(card)[0])
    const firstCard = selectedCards.splice(0, 1)[0]
    selectedCards.includes(firstCard) ? removeCards(firstCard) : endTurn()
  }

  useEffect(() => {
    if (!Object.keys(cards).length && !gameCompleted) getCards()
    if (selectedCards.length === 2) checkPair()
  })
  return (
    <div>
      <Header
        removedCards={removedCards}
        setting={setting}
        changeSetting={changeSetting}
        gameCompleted={gameCompleted}
        store={store}
      />

      {cards.length ? <Cards store={store} /> : null}
    </div>
  )
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
  gameCompleted: PropTypes.bool,
}

const mapState = ({
  game: { cards, selectedCards, removedCards, setting, gameInProgress, gameCompleted },
}) => ({
  cards,
  selectedCards,
  removedCards,
  setting,
  gameInProgress,
  gameCompleted,
})

const mapDispatch = dispatch => ({
  getCards: () => dispatch(fetchCards()),
  endTurn: () => dispatch(endTurn()),
  removeCards: card => dispatch(removeCards(card)),
  changeSetting: e => dispatch(editSetting(e.target.value)),
})

export default connect(mapState, mapDispatch)(Game)
