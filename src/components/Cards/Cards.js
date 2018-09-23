import React, { Component } from 'react'
import styles from './Cards.scss'

class Card extends Component {
  constructor(props) {
    super()
    this.state = { showing: false }

    this.cardRef = React.createRef();
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
  }

  handleClick(e) {
    const { showing } = this.state

    if (this.cardRef.current.contains(e.target)) {
      this.setState({ showing: !showing })
    }
  }

  render() {
    const { data } = this.props
    const { showing } = this.state
    const { cardRef } = this

    return (
      <div className={styles.card} ref={cardRef}>
        {showing ? data : ''}
      </div>
    )
  }
}


const CardGrid = (props) => {
  const { data } = props

  return (
    <div className={styles.container}>
        {
          data.map((card, idx) => {
            return <Card key={idx} data={card} />
          })
        }
    </div>
  )
}

export default CardGrid
