import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import MessageInput from './MessageInput';

function App() {
  const [socket, setSocket] = useState(null);
  const [time, setTime] = useState("")

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    console.log(newSocket)
    return () => newSocket.close();

  }, [setSocket]);

  const test = () => {
  socket.on('time', (timeString) => {
    setTime(timeString)
  });
}

  return (
    <div className="App">
      { socket ? (
        <div className="chat-container">
          <button onClick={test}>click me</button>
          <p>Server time: {time}</p>
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
