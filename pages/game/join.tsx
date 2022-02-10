import Link from 'next/link';
import Head from 'next/head';
import Nav from '../../components/nav';
import EVENTS from "../../config/events";
import { useSockets } from "../../context/socket.context";
import styles from "../../styles/Home.module.css";
import forms from '../../styles/Forms.module.css';

const Join = () => {
  const { socket, roomId, rooms } = useSockets();
  function handleJoinRoom(key) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <div className={styles.container}>
      <Head>
        <link href="/stylesheets/bootstrap/bootstrap-grid.min.css" rel="stylesheet" />
      </Head>
      <Nav />
      <h1 className={styles.title}> Join </h1>
      {Object.keys(rooms).length != 0 ? (
        <ul className={styles.rooms}>
          {Object.keys(rooms).slice(0).reverse().map((key) => {
            return (
              <Link href={`/game/[room]`} as={`/game/${key}`} passHref key={key}>
                <li className={`${styles.room} ${forms.button}`} key={key} onClick={() => handleJoinRoom(key)}>
                  <a className={styles.room}>
                    <div className='row'>
                      <div className='col-6'>
                        <span>
                          Code
                        </span>
                        <p>
                          {rooms[key].name}
                        </p>
                      </div>
                      <div className='col-6'>
                        <span>
                          Players
                        </span>
                        <p>
                          0/0
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </Link>
            );
          }
          )}
        </ul>
      ) : (
        <div>

            There aren't any rooms. <Link href='/game/create'><a> Create one? </a></Link>

        </div>
      )
      }
    </div>
  );
};

export default Join;