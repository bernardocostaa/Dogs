import React from "react";
import FeedModal from "./FeedModal";
import FeedPhost from "./FeedPhost";
import PropTypes from 'prop-types';

const Feed = ({ user }) => {
  const [modalPhoto, setmodalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait)
          setPages((pages) => [...pages, pages.length + 1]);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, 500);
      }
    }
    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite]);
  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setmodalPhoto={setmodalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhost
          key={page}
          user={user}
          page={page}
          setmodalPhoto={setmodalPhoto}
          setInfinite={setInfinite}
        />
      ))}
      {!infinite && !user && (
        <p
          style={{
            textAlign: 'center',
            padding: '2rem 0 4rem 0',
            color: '#888',
          }}
        >
          Não existem mais postagens.
        </p>
      )}
    </div>
  );
};

Feed.defaultProps = {
  user:0
}

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
