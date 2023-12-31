import React from "react";
import UserHeadNav from "./UserHeadNav";
import styles from "./UserHead.module.css";
import { useLocation } from "react-router-dom";

const UserHead = () => {
  const [title, setTitle] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case "/conta/postar":
        setTitle("Poste Sua Foto");
        break;
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      default:
        setTitle("Minha Conta");
        break;
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeadNav />
    </header>
  );
};

export default UserHead;
