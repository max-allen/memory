/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectCard } from '../../store'
import styles from './Cards.scss'

class Card extends Component {
  constructor() {
    super()
    this.state = { selected: false }

    this.cardRef = React.createRef()
    this.handleClick = this.handleClick.bind(this)
    this.chooseCard = this.chooseCard.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
  }

  componentDidUpdate(prevProps) {
    if (!this.props.selectedCards.length) {
      if (prevProps.selectedCards.length) {
        this.setState({ showing: false, selected: false })
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick)
  }

  handleClick(e) {
    const { showing, selected } = this.state

    if (!selected) {
      if (this.cardRef.current.contains(e.target)) {
        this.setState({ showing: !showing })
      }
    }
  }

  chooseCard(card) {
    const { selected } = this.state

    if (!selected) {
      this.setState({ selected: true })
      setTimeout(() => {
        this.props.updateSelected(card)
      }, 100)
    }
  }

  render() {
    const { id, data } = this.props
    const { selected } = this.state
    const { cardRef, chooseCard } = this

    return (
      <div
        className={styles.card}
        ref={cardRef}
        onClick={() => {
          chooseCard({ [id]: data })
        }}
        role="button"
      >
        {selected ? data : ''}
      </div>
    )
  }
}

Card.propTypes = {
  data: PropTypes.string,
  id: PropTypes.number,
  updateSelected: PropTypes.func.isRequired,
  selectedCards: PropTypes.instanceOf(Array),
}

const CardGrid = props => {
  const { cards, updateSelected, selectedCards } = props

  return (
    <div className={styles.container}>
      {cards.map((card, idx) => (
        <Card
          key={`${idx.toString()}${card}`}
          id={idx}
          data={card}
          updateSelected={updateSelected}
          selectedCards={selectedCards}
        />
      ))}
    </div>
  )
}

const mapState = state => ({
  cards: state.game.cards,
  selectedCards: state.game.selectedCards,
})

const mapDispatch = dispatch => ({
  updateSelected: card => {
    dispatch(selectCard(card))
  },
})

CardGrid.propTypes = {
  cards: PropTypes.instanceOf(Array),
  updateSelected: PropTypes.func.isRequired,
  selectedCards: PropTypes.instanceOf(Array),
}

export default connect(mapState, mapDispatch)(CardGrid)
