import React from 'react'
import Timer from '../Timer/Timer'
import styles from './Navbar.scss'

const Navbar = (props) =>  {
	const { removedCards } = props
	return (
	  <div className={styles.container}>
	  	<h1 className={styles.header}>Memory</h1>
	    <Timer />
	    {Object.keys(removedCards).length ?
	    	Object.keys(removedCards).map((idx) => {
	    		return (
	    			<div key={idx}>{removedCards[idx]}</div>
	    		)
	    	})
	    : null
		}
	  </div>
	)
	
}


export default Navbar
