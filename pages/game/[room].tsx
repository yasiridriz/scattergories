import { useEffect, useState, useRef } from "react";
import Head from 'next/head';
import Link from 'next/link';
import EVENTS from "../../config/events";
import { useSockets } from "../../context/socket.context";
import styles from '../../styles/Game.module.css';
import forms from '../../styles/Forms.module.css';

function MessagesContainer() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef(null);
  const messageEndRef = useRef(null);

  const categories = [
    'Animal', 'City', 'Plant', 'Celebrity', 'Name'
  ]

  // scrolling functions
  const list = useRef(null); // reference list object 
  const card = useRef(null); // reference card object
  const [scrollX, setscrollX] = useState(0); // scroll position
  const [scrollEnd, setscrollEnd] = useState(false); // for disabling buttons

  const slide = (shift) => {
    list.current.scrollLeft = list.current.scrollLeft + shift
    if (
      Math.floor(list.current.scrollWidth - list.current.scrollLeft) <=
      list.current.offsetWidth
    ) {
      setscrollEnd(true);
    } else {
      setscrollEnd(false);
    }
  };

  // for disabling buttons
  const scrollCheck = () => {
    setscrollX(list.current.scrollLeft);
    if (
      Math.floor(list.current.scrollWidth - list.current.scrollLeft) <=
      list.current.offsetWidth
    ) {
      setscrollEnd(true);
    } else {
      setscrollEnd(false);
    }
  };

  function handleSendMessage() {
    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = "";
  }

  if (!roomId) {
    return <div />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Room #
        </title>
        <meta name="theme-color" content="#fdfaec" />
      </Head>
      <main className={styles.main}>
        <div className={styles.menu}>
          <Link href="/game"><a> Leave this game </a></Link>
        </div>
        <div className={styles.headContainer}>
          <div className={styles.head}>
            <p className={styles.currentLetter}><span>Letter: </span> F </p>
          </div>
        </div>
        <ul ref={list} onScroll={scrollCheck} className={styles.categoriesContainer}>
          {categories.map((category, key) => {
            return (
              <li className={`${styles.categoryCard}`} key={category} ref={card}>
                <h2>{key+1}. {category}</h2>
                <div className={forms.formgroup} style={{ margin: '3em 0' }}>
                  <input
                    type='text'
                    className={styles.text}
                    placeholder="Answer"
                    ref={newMessageRef}
                  />
                </div>
              </li>
            );
          })}
          <li className={`${styles.categoryCard}`} key={'submit'}>
            <h3>
              You sure you're done?
            </h3>
            <button className={`${forms.button} ${forms.fullwidth} ${styles.finish}`} onClick={handleSendMessage}>Finish</button>
          </li>
        </ul>


        <div className={styles.operations}>
          <div className={styles.operations}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className={`${forms.button} ${forms.inline}`} style={{ width: '120px' }} onClick={() => slide(-card.current.offsetWidth)} disabled={scrollX <= 25}> &larr; Previous  </button>
              <button className={`${forms.button} ${forms.inline} `} style={{ width: '120px' }} onClick={() => slide(+card.current.offsetWidth)} disabled={scrollEnd}> Next &rarr; </button>
            </div>
          </div>
          {/* <button className={`${forms.button} ${forms.fullwidth} ${styles.finish}`} onClick={handleSendMessage}>Finish</button> */}
        </div>

        {
          messages.map(({ message, username, time }, index) => {
            return (
              <div key={index} className={styles.container}>
                <div key={index} className={styles.messageInner}>
                  <strong className={styles.messageSender}>
                    {username} - {time}
                  </strong>
                  <span className={styles.messageBody}> &rarr; {message}</span>
                </div>
              </div>
            );
          })
        }

      </main >
    </div >
  );
}

export default MessagesContainer;
