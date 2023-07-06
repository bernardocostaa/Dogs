import React from "react";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Erro from "../Helper/Erro";
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments,single }) => {
  const [comment, setComents] = React.useState('');
 
  const {request,error} = useFetch()

  async function handleSubmit(event){
    event.preventDefault();
    const {url,options} = COMMENT_POST(id,{comment})
    const {response, json} = await request(url,options)
    // console.log(json)
    if(response.ok){
      setComents('')
      setComments((comments) => [...comments, json])
    }
  }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
      <textarea className={styles.textarea}
        id="coments"
        name="coments"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComents(target.value)}
      />
      <button className={styles.btn}>
        <Enviar />
      </button>
      <Erro error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
