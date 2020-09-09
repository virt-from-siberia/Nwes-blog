import React, { useContext } from "react";
import Button from "@material-ui/core/Button";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import userLogo from "../../img/sec.png";

const Home = React.memo(function Home({ isAuthenticated, setShowPopap }) {
  const auth = useContext(AuthContext);

  const Message = () => {
    if (isAuthenticated && auth.token === "user") {
      return (
        <p>
          Вы зашли как <span className=''>пользователь</span> , вы можете
          просматривать и добавлять новые новости
        </p>
      );
    }
    if (isAuthenticated && auth.token === "admin") {
      return (
        <p>
          Вы зашли как <span className=''>администратор</span> , вы можете
          просматривать, добавлять а также модерировать новости.
        </p>
      );
    }
    return (
      <>
        <p>
          Вы зашли как <span className=''>гость</span> , вы можете только
          просматривать новости. Для того чтобы добавить новую новость
          необходимо войти в систему
        </p>
        <Button
          onClick={() => setShowPopap(true)}
          style={{
            backgroundColor: "#11c55c",
            color: "white",
          }}
          variant='contained'
          startIcon={<AccountBoxIcon />}
        >
          Войти в систему
        </Button>
      </>
    );
  };

  return (
    <div className='home'>
      <div className='home__welcome'>
        <img src={userLogo} alt='userLogo' />
        <h1 className='h1'>
          Привет {isAuthenticated && isAuthenticated ? auth.name : "гость"}
        </h1>
        <Message />
        <Link to='/news'>
          <Button
            style={{
              backgroundColor: "darkblue",
              color: "white",
              marginTop: "15px",
            }}
            variant='contained'
            startIcon={<AnnouncementIcon />}
          >
            Перейтии к новостям
          </Button>
        </Link>
      </div>
    </div>
  );
});

export default Home;
