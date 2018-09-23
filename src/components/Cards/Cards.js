import React, { Component } from 'react'
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
    const { resetTurn } = this.props

    if (prevProps.resetTurn !== resetTurn) {
      if (resetTurn) {
        this.setState({ showing: false, selected: false })
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
    const { id, data, updateSelected } = this.props
    const { showing } = this.state
    const { cardRef, chooseCard } = this

    return (
      <div className={styles.card} ref={cardRef} onClick={() => { chooseCard({ [id]: data }) }}>
        {showing ? data : ''}
      </div>
    )
  }
}

const CardGrid = (props) => {
  const { data, updateSelected, resetTurn } = props

  return (
    <div className={styles.container}>
        {
          data.map((card, idx) => {
            return <Card key={idx} id={idx} data={card} updateSelected={updateSelected} resetTurn={resetTurn} />
          })
        }
    </div>
  )
}

export default CardGrid
