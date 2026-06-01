import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('chats')
      .orderBy('timestamp')
      .onSnapshot(sn => {
        const msgs = sn.docs.map(doc => doc.data());
        setMessages(msgs);
      });
    return () => unsubscribe();
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    if (text.trim() === '') return;
    db.collection('chats').add({
      user: user.displayName || user.email,
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

setText('');
  };

  return (
    <div className="chat-box">
      <h3>Chat with Warden</h3>
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i}><b>{m.user}:</b> {m.text}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={text} onChange={e => setText(e.target.value)}
               placeholder="Type message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;