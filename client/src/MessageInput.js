import React, { useEffect, useState } from 'react';
import './MessageInput.css';


import DelicateCapy from "./img/delicateCapy.jpeg"
import FabCapy from "./img/fabCapy.jpeg"
import Target1 from "./img/target1.png"
import Target2 from "./img/target2.png"
import Target3 from "./img/target3.png"
import Target4 from "./img/target4.png"
import Target5 from "./img/target5.png"
import Muffin01 from "./img/muffin1.png"
import Muffin02 from "./img/muffin2.png"
import Muffin03 from "./img/muffin3.png"
import Muffin04 from "./img/muffin4.png"
import Muffin05 from "./img/muffin5.png"
import Muffin06 from "./img/muffin6.png"
import Muffin07 from "./img/muffin7.png"
import Muffin08 from "./img/muffin8.png"
import Muffin09 from "./img/muffin9.png"
import Muffin10 from "./img/muffin10.png"
import Muffin11 from "./img/muffin11.png"
import Muffin12 from "./img/muffin12.png"
import Muffin13 from "./img/muffin13.png"
import Muffin14 from "./img/muffin14.png"
import Muffin15 from "./img/muffin15.png"
import Muffin16 from "./img/muffin16.png"
import Muffin17 from "./img/muffin17.png"
import Muffin18 from "./img/muffin18.png"
import Muffin19 from "./img/muffin19.png"
import Muffin20 from "./img/muffin20.png"
import Muffin21 from "./img/muffin21.png"
let targets = [Target1, Target2, Target3, Target4, Target5]
let imagesAll = [[Target1, "target"], [Muffin01, "muffin"], [Muffin01, "muffin"], [Muffin01, "muffin"], [Muffin02, "muffin"], [Muffin02, "muffin"], [Muffin02, "muffin"], [Muffin03, "muffin"], [Muffin03, "muffin"], [Muffin03, "muffin"], [Muffin04, "muffin"], [Muffin05, "muffin"], [Muffin05, "muffin"], [Muffin06, "muffin"], [Muffin06, "muffin"], [Muffin07, "muffin"], [Muffin07, "muffin"], [Muffin07, "muffin"], [Muffin08, "muffin"], [Muffin08, "muffin"], [Muffin08, "muffin"], [Muffin09, "muffin"], [Muffin09, "muffin"], [Muffin09, "muffin"], [Muffin10, "muffin"], [Muffin10, "muffin"], [Muffin10, "muffin"], [Muffin11, "muffin"], [Muffin11, "muffin"], [Muffin11, "muffin"], [Muffin12, "muffin"], [Muffin12, "muffin"], [Muffin13, "muffin"], [Muffin13, "muffin"], [Muffin13, "muffin"], [Muffin14, "muffin"], [Muffin14, "muffin"], [Muffin14, "muffin"], [Muffin15, "muffin"], [Muffin15, "muffin"], [Muffin16, "muffin"], [Muffin16, "muffin"], [Muffin17, "muffin"], [Muffin17, "muffin"], [Muffin18, "muffin"], [Muffin18, "muffin"], [Muffin19, "muffin"], [Muffin20, "muffin"], [Muffin20, "muffin"], [Muffin21, "muffin"]]

const NewMessage = ({socket}) => {
  const [value, setValue] = useState('');
  const [imgs, setImgs] = useState([]);
  const [messages, setMessages] = useState({});
  const [pics, setPics] = useState({});
  const [avg, setAvg] = useState(0)
  const [time, setTime] = useState(0)
//const [imgs, setImgs] = useState(["./img/target.png", "./img/muffin1.png", "./img/muffin1.png", "./img/muffin2.png", "./img/muffin2.png", "./img/muffin3.png", "./img/muffin3.png", "./img/muffin4.png", "./img/muffin5.png", "./img/muffin5.png", "./img/muffin6.png", "./img/muffin6.png", "./img/muffin7.png", "./img/muffin7.png", "./img/muffin8.png", "./img/muffin8.png", "./img/muffin9.png", "./img/muffin9.png", "./img/muffin10.png", "./img/muffin10.png", "./img/muffin11.png", "./img/muffin11.png", "./img/muffin12.png", "./img/muffin12.png", "./img/muffin13.png", "./img/muffin13.png", "./img/muffin14.png", "./img/muffin14.png", "./img/muffin15.png", "./img/muffin15.png", "./img/muffin16.png", "./img/muffin16.png", "./img/muffin17.png", "./img/muffin17.png", "./img/muffin18.png", "./img/muffin18.png", "./img/muffin19.png", "./img/muffin20.png", "./img/muffin21.png"])

  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)
  const [round, setRound] =useState(0)
  const [gameFinished, setGameFinished] = useState(false)
  const [gameAvg, setGameAvg] = useState(0)


  useEffect(() => {
    let images = [["./img/delicateCapy.jpeg", "thing"]]
    let temp = [];
    let random = Math.floor(Math.random() * 40);
    let i = 0;
    if (imgs.length < 1) {
      setImgs(shuffle(imagesAll))
    }
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[message.id] = message;
        return newMessages;
      });
    };
  
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };

    const picListener = (pic, users) => {
      console.log("pic", pic)
        setPics((prevPics) => {
            const newPics = {...prevPics};
            newPics[pic.id] = pic;
            return newPics
        })
        setTime(users[socket.id]["time"])
        let sum = 0;
        let count = 0;
        console.log(users)
        for (let user of Object.values(users)) {
          for (let roundTime of user["rounds"]) {
            if (roundTime > 0) {
              sum += roundTime
              count += 1
            }
          }
        }
        setAvg(sum / count)
        setEnded(true)
        let userRoundCount = users[socket.id]["rounds"].length 
        if (userRoundCount != 0 && userRoundCount % 5 == 0) setGameFinished(true)
        setRound(userRoundCount % 5)
        setGameAvg(average(users[socket.id]["rounds"].slice(0 - (userRoundCount % 5))))
    }
  
    socket.on('message', messageListener);
    socket.on('pic', picListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('pic', picListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket])
  
  const submitForm = (e) => {
    e.preventDefault();
    let data = {value: value, time: e.timeStamp}
    socket.emit('message', data);
    setValue('');
  };

  const sayWhichPic = (e) => {
    e.preventDefault();
    socket.emit('pic', {value: e.target.src, name: e.target.alt, userId: socket.id})
  }

  const findChihuahua = () => {
    for (let i in imagesAll) {
      if (imagesAll[i][1] == "target") return i;
    }
  }

  const start = () => {
    setStarted(true)
    setEnded(false)
    imagesAll[findChihuahua()][0] = targets[round]
    setImgs(shuffle(imagesAll))
    socket.emit('startTimer', socket.id)
    if (round == 0) {
      setGameFinished(false)
      shuffle(targets)
    }
  }

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const average = (arr) => {
    let sum = 0;
    for (let elem of arr) sum += elem;
    return sum / arr.length
  }



  return (
    <div className="full">
      {!started && <div className="getStarted">
        <p>In this activity, your goal is to find the thing that is not like the others. You should try to do this as quickly as possible!</p>
        <button className="startButton" onClick={start}>Get Started</button>
        </div>}
        {ended && 
          <div >
            <p>You found the target in {time.toFixed(3)} seconds!</p>
            <p>Your average this game is {gameAvg.toFixed(3)} seconds.</p>
            <p>The average time for this group is {avg.toFixed(3)} seconds.</p>
            {gameFinished && <p>The game is over!</p>}
            {!gameFinished && <button className="startButton" onClick={start}>Go to round {round + 1} / 5</button>}
            {gameFinished && <button className="startButton" onClick={start}>Restart Game</button>}
            </div>

      
      }
    {started && !ended &&
    <div className="game">
      {/* <div className="instructions">
        <p>Find the thing that is not like the others as fast as you can. This is the average time it takes, see if you can get this number down!</p>
        <h2>0 seconds</h2>
      </div> */}
        <div className="grid-container">
          
            {imgs.map((img, i) => (
              <img key={i} src={img[0]} onClick={sayWhichPic} alt={img[1]} />
            ))}
        </div>
    </div>
    
    }
    </div>
  );
};

export default NewMessage;