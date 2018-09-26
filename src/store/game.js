import axios from 'axios'

const CARD_DATA_LOADED = 'CARD_DATA_LOADED'
const CARD_SELECTED = 'CARD_SELECTED'
const TURN_RESET = 'TURN_RESET'
const CARDS_REMOVED = 'CARDS_REMOVED'
const SETTING_CHANGED = 'SETTING_CHANGED'
const GAME_STATUS_CHANGED = 'GAME_STATUS_CHANGED'
const GAME_COMPLETED = 'GAME_COMPLETED'
const CLEAR_REMOVED_CARDS = 'CLEAR_REMOVED_CARDS'

const loadCardData = (cardData) => ({ type: CARD_DATA_LOADED, cardData })
const setSelectedCard = (selectedCard) => ({ type: CARD_SELECTED, selectedCard })
const resetTurn = () => ({ type: TURN_RESET })
const cardsRemoved = (nextCards, removedCards) => ({ type: CARDS_REMOVED, nextCards, removedCards })
const changeSetting = (nextSetting) => ({ type: SETTING_CHANGED, nextSetting })
const toggleGameStatus = (nextStatus) => ({ type: GAME_STATUS_CHANGED, nextStatus })
const completeGame = () => ({ type: GAME_COMPLETED })
const clearRemovedCards = () => ({ type: CLEAR_REMOVED_CARDS })

const gameState = {
  setting: 'easy',
  cards: {},
  selectedCards: [],
  removedCards: [],
  gameInProgress: false,
  gameCompleted: false,
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
    const { selectedCards, gameInProgress } = state.game

    if (!selectedCards.length && !gameInProgress) {
      dispatch(toggleGameStatus(!gameInProgress))
    }

    dispatch(setSelectedCard(card))
  }
}

export const endTurn = () => dispatch => { dispatch(resetTurn()) }

export const removeCards = removedCard => {
  return (dispatch, getState) => {
    const state = getState()
    const { cards, gameInProgress } = state.game

    let nextCards = cards.filter(card => {return card !== removedCard})

    if (!nextCards.length) {
      dispatch(cardsRemoved(nextCards, removedCard))
      dispatch(resetTurn())

      dispatch(toggleGameStatus(!gameInProgress))
      dispatch(completeGame())

      return
    }

    dispatch(cardsRemoved(nextCards, removedCard))
    dispatch(resetTurn())
  }
}

export const editSetting = (nextSetting) =>  {
  return (dispatch, getState) => {
    const state = getState()
    const { gameInProgress } = state.game

    if (gameInProgress) {
      dispatch(toggleGameStatus(!gameInProgress))
    }

    dispatch(changeSetting(nextSetting))
    dispatch(clearRemovedCards())
    dispatch(fetchCards())
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
      return Object.assign({}, state, { cards: action.nextCards, removedCards: state.removedCards.slice().concat([(action.removedCards  )]) })
    case CLEAR_REMOVED_CARDS:
      return Object.assign({}, state, { removedCards: [] })
    case SETTING_CHANGED:
      return Object.assign({}, state, { setting: action.nextSetting })
    case GAME_STATUS_CHANGED:
      return Object.assign({}, state, { gameInProgress: action.nextStatus })
    case GAME_COMPLETED:
      return Object.assign({}, state, { gameCompleted: !state.gameCompleted })
    default:
      return state
  }
}
