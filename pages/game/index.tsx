import Link from 'next/link';
import { useEffect } from 'react';
import EVENTS from "../../config/events";
import { useSockets } from "../../context/socket.context";
import styles from '../../styles/Home.module.css';
import forms from '../../styles/Forms.module.css';

import Name from '../../components/name';
import { useRouter } from 'next/router';


const Join = () => {
  const { socket, roomId, rooms } = useSockets();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('username') == '') {
      router.push('/');
    }
  }, []);

  function handleJoinRoom(key) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <div className={styles.container}>
      <Name />
      <main className={styles.main} style={{ background: 'transparent', border: 'none' }}>
        <div className='container'>
          <Link href="/game/join">
            <a>
              <div className={`${forms.button}`} style={{ background: '#fdfaec', color: 'black', border: '3px solid black' }}>

                <h2>Join a room &rarr; </h2>


                <p>Join to a room to play with people all around the world</p>
              </div>
            </a>
          </Link>
          <Link href="/game/create">
            <a>
              <div className={`${forms.button}`} style={{ background: '#fdfaec', color: 'black', border: '3px solid black' }}>
                <h2>New room +</h2>
                <p>Create your own room and invite your friends to play</p>
              </div>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Join;