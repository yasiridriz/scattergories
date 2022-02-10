import { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import formStyles from '../styles/Forms.module.css';
import Name from '../components/name';
import { useSockets } from "../context/socket.context";
import { useRouter } from "next/router";

export default function Home() {
  const { username, setUsername } = useSockets();

  const usernameRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (usernameRef.current.value != '') {
      setUsername(localStorage.getItem("username"))
      router.push('/game')
    }
  }, []);

  function handleSetUsername() {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }

    setUsername(value);

    localStorage.setItem("username", value);
    router.push('/game')
  }



  return (
    <div className={styles.container}>
      <Name />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Log In
        </h1>
        <div className={formStyles.formgroup}>
          <div>
            <input placeholder="Username" ref={usernameRef} className={formStyles.text} />
          </div>
          <div>
            <button className={formStyles.button} onClick={handleSetUsername}>
              Log In
            </button>
          </div>

        </div>
      </main>
    </div >
  );
}
