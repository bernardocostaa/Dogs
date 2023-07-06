import React from 'react'
import styles from "./FeedPhostItem.module.css"
import Image from '../Helper/Image'

const FeedPhostItem = ({photo, setmodalPhoto}) => {
  function handleClique(){
    setmodalPhoto(photo)
  }

  return <li className={styles.photo} onClick={handleClique}>
    <Image src={photo.src} alt={photo.title} />
    <span className={styles.visualizacao}>{photo.acessos}</span>
  </li>
}

export default FeedPhostItem