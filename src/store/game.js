import axios from 'axios'

const LOAD_CARD_DATA = 'LOAD_CARD_DATA'
const SELECT_CARD = 'SELECT_CARD'
const RESET_TURN = 'RESET_TURN'
const REMOVE_CARDS = 'REMOVE_CARDS'
const CHANGE_SETTING = 'CHANGE_SETTING'
const CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS'
const END_GAME = 'END_GAME'
const CLEAR_REMOVED_CARDS = 'CLEAR_REMOVED_CARDS'
const CLEAR_COMPLETED_STATUS = 'CLEAR_COMPLETED_STATUS'

const loadCardData = cardData => ({ type: LOAD_CARD_DATA, cardData })
const setSelectedCard = selectedCard => ({ type: SELECT_CARD, selectedCard })
const resetTurn = () => ({ type: RESET_TURN })
const cardsRemoved = (nextCards, removedCards) => ({ type: REMOVE_CARDS, nextCards, removedCards })
const changeSetting = nextSetting => ({ type: CHANGE_SETTING, nextSetting })
const toggleGameStatus = nextStatus => ({ type: CHANGE_GAME_STATUS, nextStatus })
const completeGame = () => ({ type: END_GAME })
const clearRemovedCards = () => ({ type: CLEAR_REMOVED_CARDS })
const clearCompletedStatus = () => ({ type: CLEAR_COMPLETED_STATUS })

const gameState = {
  setting: 'easy',
  cards: [],
  selectedCards: [],
  removedCards: [],
  gameInProgress: false,
  gameCompleted: false,
}

export const fetchCards = () => (dispatch, getState) => {
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

export const selectCard = card => (dispatch, getState) => {
  const state = getState()
  const { selectedCards, gameInProgress } = state.game

  if (!selectedCards.length && !gameInProgress) {
    dispatch(toggleGameStatus(!gameInProgress))
  }
  dispatch(setSelectedCard(card))
}

export const endTurn = () => dispatch => {
  dispatch(resetTurn())
}

export const removeCards = removedCard => (dispatch, getState) => {
  const state = getState()
  const { cards, gameInProgress } = state.game

  const nextCards = cards.filter(card => card !== removedCard)

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

export const editSetting = nextSetting => (dispatch, getState) => {
  const state = getState()
  const { gameInProgress, gameCompleted } = state.game

  if (gameInProgress) {
    dispatch(toggleGameStatus(!gameInProgress))
  }

  dispatch(changeSetting(nextSetting))
  dispatch(clearRemovedCards())
  dispatch(fetchCards())

  /* Reset if user keeps playing post game completion */

  if (gameCompleted) {
    dispatch(clearCompletedStatus())
  }
}

export default (state = gameState, action) => {
  switch (action.type) {
    case LOAD_CARD_DATA:
      return Object.assign({}, state, { cards: action.cardData })
    case SELECT_CARD:
      return Object.assign({}, state, {
        selectedCards: state.selectedCards.slice().concat([action.selectedCard]),
      })
    case RESET_TURN:
      return Object.assign({}, state, { selectedCards: [] })
    case REMOVE_CARDS:
      return Object.assign({}, state, {
        cards: action.nextCards,
        removedCards: state.removedCards.slice().concat([action.removedCards]),
      })
    case CLEAR_REMOVED_CARDS:
      return Object.assign({}, state, { removedCards: [] })
    case CHANGE_SETTING:
      return Object.assign({}, state, { setting: action.nextSetting })
    case CHANGE_GAME_STATUS:
      return Object.assign({}, state, { gameInProgress: action.nextStatus })
    case END_GAME:
      return Object.assign({}, state, { gameCompleted: true })
    case CLEAR_COMPLETED_STATUS:
      return Object.assign({}, state, { gameCompleted: false })
    default:
      return state
  }
}
