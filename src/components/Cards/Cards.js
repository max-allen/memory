import React, { Component } from 'react'
import styles from './Cards.scss'

const Card = (props) => {
  const { data, showing } = props

  return (
    <div className={styles.container}>
      {
        data.map((card, idx) => {
          return (
            <div key={idx} className={styles.card}>
              {showing ? card : '' }
            </div>
          )
        })
      }

    </div>
  )

}

class CardContainer extends Component {
  constructor(props) {
    super()

    this.state = {
      showing: false,
    }
  }

  render() {
    return <Card data={this.props.data} showing={this.state.showing} />
  }
}

export default CardContainer
