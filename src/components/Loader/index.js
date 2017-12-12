import React from 'react'
import Halogen from 'halogen'
import styles from './styles.css'

export default function Loader ({ isLoading }) {
  return (
    <div
      className={styles.loaderContainer}
      style={{ display: isLoading ? '' : 'none' }}>
      <Halogen.ClipLoader color='#3ac2dd' size='100px' />
    </div>
  )
}
