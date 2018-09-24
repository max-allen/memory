import axios from 'axios'

const CARD_DATA_LOADED = 'CARD_DATA_LOADED'
const CARD_SELECTED = 'CARD_SELECTED'
const TURN_RESET = 'TURN_RESET'
const CARDS_REMOVED = 'CARDS_REMOVED'

const loadCardData = (cardData) => ({ type: CARD_DATA_LOADED, cardData })
const setSelectedCard = (selectedCard) => ({ type: CARD_SELECTED, selectedCard })
const resetTurn = () => ({ type: TURN_RESET })
const cardsRemoved = (nextCards) => ({ type: CARDS_REMOVED, nextCards })

const gameState = {
  setting: 'easy',
  cards: {},
  selectedCards: [],
  removedCards: [],
}

export const fetchCards = () => {
  return (dispatch, getState) => {
    const state = getState()
    const { setting } = state.game

    axios
      .get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
      .then(resp => resp.data)
      .then(cards => {
        cards = cards.levels.filter(level => level.difficulty === setting)[0].cards
        dispatch(loadCardData(cards))
      })
  }
}

export const selectCard = (card) => {
  return (dispatch, getState) => {
    const state = getState()
    const { selectedCards } = state.game

    dispatch(setSelectedCard(card))
  }
}

export const endTurn = () => dispatch => { dispatch(resetTurn()) }

export const removeCards = removedCard => {
  return (dispatch, getState) => {
    const state = getState()
    const { cards } = state.game

    let nextCards = cards.filter(card => {return card !== removedCard})

    dispatch(cardsRemoved(nextCards))
    dispatch(resetTurn())
  }
}

export default (state = gameState, action) => {
  switch (action.type) {
    case CARD_DATA_LOADED:
      return Object.assign({}, state, { cards: action.cardData })
    case CARD_SELECTED:
      return Object.assign({}, state, { selectedCards: state.selectedCards.slice().concat([(action.selectedCard)]) })
    case TURN_RESET:
      return Object.assign({}, state, { selectedCards: [] })
    case CARDS_REMOVED:
      return Object.assign({}, state, { cards: action.nextCards })
    default:
      return state
  }
}
