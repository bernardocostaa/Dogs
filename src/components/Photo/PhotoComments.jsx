import React from 'react'
import {UserContext} from '../../UserContext'
import PhotoCommentsForm from './PhotoCommentsForm'
import styles from './PhotoComments.module.css'


const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments)
  const commemtsSection  = React.useRef()
  const {login}= React.useContext(UserContext)

  React.useEffect(()=>{
    commemtsSection.current.scrollTop = commemtsSection.current.scrollHeight
  },[comments])

  return (
    <>
      <ul ref={commemtsSection} className={`${styles.comment} ${props.single ? styles.single : ''}`}>
        {comments.map(comment => <li key={comment.comment_ID}>
          <b>{comment.comment_author}:
            <span>{comment.comment_content}</span>
          </b>
        </li>)}
      </ul>
      {login &&  <PhotoCommentsForm single={props.single} id={props.id} setComments={setComments} />}
      </>
  )
}

export default PhotoComments