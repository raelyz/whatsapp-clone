import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined, TagFaces } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState('')
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState('')
    const [{ user }, dispatch] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('')

    }

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [roomId])

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p> last seen {''}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>

                    <IconButton >
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_Body">
                {messages ? (
                    messages.map(message => (
                        <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
                            <span className="chat_name">{message.name}
                            </span>
                            {message.message}
                            <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>

                    ))
                ) : null}
            </div>
            <div className="chat_footer">
                <IconButton >
                    <InsertEmoticon />
                </IconButton>
                <IconButton >
                    <AttachFile />
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" className="chat_input" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit" className="chat_submitButton">
                        Send a message
                    </button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
