/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectCard } from '../../store'
import styles from './Cards.scss'

function Card({ data, id, updateSelected, selectedCards }) {
  const [selected, setSelected] = useState(false)

  const chooseCard = card => {
    if (!selected) {
      setSelected(!selected)

      /* Timeout is a UX related concern. Gives user time 
      to observe match before cards are removed from play. */

      setTimeout(() => {
        updateSelected(card)
      }, 200)
    }
  }

  useEffect(
    () => {
      // If there are no longer any selected cards on the game state, follow suit here
      if (!selectedCards.length) setSelected(false)
    },
    [selectedCards]
  )

  return (
    <div
      className={styles.card}
      onClick={() => {
        chooseCard({ [id]: data })
      }}
      role="button"
    >
      {selected ? data : ''}
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.string,
  id: PropTypes.number,
  updateSelected: PropTypes.func.isRequired,
  selectedCards: PropTypes.instanceOf(Array),
}

const CardGrid = ({ cards, updateSelected, selectedCards }) => (
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

const mapState = ({ game: { cards, selectedCards } }) => ({
  cards,
  selectedCards,
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
