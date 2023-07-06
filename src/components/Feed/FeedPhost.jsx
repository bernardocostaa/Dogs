import React from "react";
import FeedPhostItem from "./FeedPhostItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Erro from "../Helper/Erro";
import Loading from "../Helper/Loading";
import styles from "./FeedPhost.module.css"

const FeedPhost = ({page,user,setmodalPhoto,setInfinite}) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response,json } = await request(url, options);
      // console.log(json);
      if(response && response.ok && json.length < total) setInfinite(false)
    }
    fetchPhotos();
  }, [request,user,page,setInfinite]);

  if (error) return <Erro error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhostItem key={photo.id} photo={photo} setmodalPhoto={setmodalPhoto} />
        ))}
      </ul>
    );
  else return;
};

export default FeedPhost;
