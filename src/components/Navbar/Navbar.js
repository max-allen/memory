import React from 'react'
import Timer from '../Timer/Timer'
import styles from './Navbar.scss'

const Navbar = () => (
  <div className={styles.container}>
  	<h1 className={styles.header}>Memory</h1>
    <Timer />
  </div>
)

export default Navbar
