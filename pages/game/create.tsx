import { useRef } from "react";
import { useRouter } from 'next/router';
import EVENTS from '../../config/events';
import { useSockets } from "../../context/socket.context";
import styles from '../../styles/Home.module.css';
import forms from '../../styles/Forms.module.css';
import Nav from "../../components/nav";

const Join = () => {
    const router = useRouter();

    const { socket } = useSockets();
    const newRoomRef = useRef(null);

    function handleCreateRoom() {
        //get the room name
        const roomName = newRoomRef.current.value || "";

        if (!String(roomName).trim()) return;

        // emit room created event
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

        // set room name input to empty string
        newRoomRef.current.value = "";

        router.push('/game/[room]', `/game/${roomName}`)
    }
    return (
        <div className={styles.container}>
            <Nav />
            <main className={styles.main}>
                <h1 className={styles.title}> New room </h1>
                <div className={forms.formgroup}>
                    <input
                        placeholder="Room Name"
                        type="text"
                        className={forms.text}
                        ref={newRoomRef}
                        required
                    />
                    <button className={forms.button} onClick={handleCreateRoom} type="submit">Continue</button>

                </div>
            </main>
        </div>
    );
};

export default Join;