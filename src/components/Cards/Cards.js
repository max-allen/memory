import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCard } from '../../store'
import styles from './Cards.scss'

class Card extends Component {
  constructor(props) {
    super()
    this.state = { showing: false, selected: false }

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
        this.setState ({ showing: false, selected: false})
      }
    }
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
    this.setState({ selected: true })
    this.props.updateSelected(card)
  }

  render() {
    const { id, data } = this.props
    const { showing } = this.state
    const { cardRef, chooseCard } = this

    // console.log('PROPS', this.props)

    return (
      <div className={styles.card} ref={cardRef} onClick={() => { chooseCard({ [id]: data }) }}>
        {showing ? data : ''}
      </div>
    )
  }
}


const CardGrid = (props) => {
  const { cards, store, updateSelected, selectedCards } = props

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

const mapState = state => {
  return {
    cards: state.game.cards,
    selectedCards: state.game.selectedCards,
  }
}

const mapDispatch = dispatch => {
  return {
    updateSelected: card => {
      dispatch(selectCard(card))
    },
  }
}

export default connect(mapState, mapDispatch)(CardGrid)
