'use strict';

const express = require('express');
const socketIO = require('socket.io');
var cors = require('cors');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server, {  cors: {
  origin: "http://localhost:3001",
  methods: ["GET", "POST"]
}
});

const uuidv4 = require('uuid').v4;

const messages = new Set();
const pics = [];
const users = {};

const defaultUser = {
  id: 'anon',
  name: 'Anonymous',
};

const messageExpirationTimeMS = 5*60 * 1000;

io.on('connection', (socket) => {
  console.log('Client connected');
  let id = socket.id
  console.log(id)
    users[id] = {
      "userId": id,
      "start": 0,
      "end":0,
      "time": 0,
      "rounds": []
    }
    console.log("users", )
    socket.on('pic', ({value, name, userId}) => handlePicClick(value, name, userId));
    socket.on('startTimer', (userId) => startTimer(userId));
  socket.on('disconnect', () => console.log('Client disconnected'));
});

function startTimer(userId) {
  users[userId]["start"] = Date.now();
  console.log("started", users[userId]["start"])
}

function handlePicClick(value, name, userId) {
  if (name == "target") {
    users[userId]["end"] = Date.now();
    console.log(users[userId]["end"], users[userId]["start"])
    let time = (users[userId]["end"] - users[userId]["start"]) / 1000
    const pic = {
      id: uuidv4(),
      user: userId,
      value,
      name,
      time: time
    };
    users[userId]["time"] = time;
    users[userId]["rounds"].push(time)
    io.emit('pic', pic, users);
    console.log("new", time)
    pics.push(pic);
  }
}

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
