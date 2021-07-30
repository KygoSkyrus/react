import { useState } from 'react';
import './App.css';

let refreshIntervalId = 0;
let defultBreakTime = 5 * 60;
let defaultSessionTime = 25 * 60;

function App() {

  const [times, settimes] = useState({
    breakTime: defultBreakTime,
    sessionTime: defaultSessionTime,
    stage: "session",
    remainingTime: defaultSessionTime
  });

  function modifyBreakTime(e) {
    if (!refreshIntervalId) {
      let amount = parseInt(e.target.value, 10);
      settimes(prevTimes => {
        if (prevTimes.stage === "break") {
          return {
            ...prevTimes,
            breakTime: prevTimes.breakTime + amount,
            remainingTime: prevTimes.breakTime + amount
          };
        } else {
          return {
            ...prevTimes,
            breakTime: prevTimes.breakTime + amount
          };
        }
      });
    }
  }

  function modifySessionTime(e) {
    if (!refreshIntervalId) {
      let amount = parseInt(e.target.value, 10);
      settimes(prevTimes => {
        if (prevTimes.stage === "session") {
          return {
            ...prevTimes,
            sessionTime: prevTimes.sessionTime + amount,
            remainingTime: prevTimes.sessionTime + amount
          };
        } else {
          return {
            ...prevTimes,
            sessionTime: prevTimes.sessionTime + amount
          };
        }
      });
    }
  }

  function startstopCountdown() {
    if (refreshIntervalId) {
      stopCountdown();
    } else {
      refreshIntervalId = setInterval(manageRemainingTime, 1000);
    }
  }

  function stopCountdown() {
    clearInterval(refreshIntervalId);
    refreshIntervalId = 0;
  }

  function manageRemainingTime() {
    if (document.getElementById("time-left").innerText === "00:00") {
      swapState();
    } else {
      reduceRemainingTime();
    }
  }

  function swapState() {
    settimes(prevTimes => {
      if (prevTimes.stage === "session") {
        return {
          ...prevTimes,
          stage: "break",
          breakTime: prevTimes.breakTime,
          remainingTime: prevTimes.breakTime
        };
      } else {
        return {
          ...prevTimes,
          stage: "session",
          sessionTime: prevTimes.sessionTime,
          remainingTime: prevTimes.sessionTime
        };
      }
    });
    playBeep();
  }

  function playBeep() {
    document.getElementById("beep").play();
  }

  function reduceRemainingTime() {
    settimes(prevTimes => {
      return {
        ...prevTimes,
        remainingTime: prevTimes.remainingTime - 1
      };
    });
  }

  function reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    stopCountdown();
    settimes(prevTimes => {
      return {
        breakTime: defultBreakTime,
        sessionTime: defaultSessionTime,
        stage: "session",
        remainingTime: defaultSessionTime
      };
    });
  }

  return (
    <>
      <div id="container">

        <h1 id="title">Pomodoro Clock</h1>

        <div id="flex2">

          <div className="flex-break">
            <h2 id="break-label">Break length
            </h2>
            <div className="i-d">
              <button id="break-increment" onClick={times.breakTime / 60 < 60 ? modifyBreakTime : undefined} value={60}>&#x25B2;</button>
              <section id="break-length">{times.breakTime / 60}</section>
              <button id="break-decrement" onClick={times.breakTime / 60 > 1 ? modifyBreakTime : undefined} value={-60}>&#x25BC;</button>
            </div>
          </div>

          <div className="flex-session">
            <h2 id="session-label">Session length</h2>
            <div className="i-d">
              <button id="session-increment" onClick={times.sessionTime / 60 < 60 ? modifySessionTime : undefined} value={60}>&#x25B2;</button>
              <section id="session-length">{times.sessionTime / 60}</section>
              <button id="session-decrement" onClick={times.sessionTime / 60 > 1 ? modifySessionTime : undefined} value={-60}>&#x25BC;</button>
            </div>
          </div>

        </div>

        <div id="flex3">
          <h2 id="timer-label">{times.stage[0].toUpperCase() + times.stage.substring(1)}
          </h2>

          <section id="time-left">{`${Math.floor(times.remainingTime / 60) < 10 ? 0 : ""}${Math.floor(times.remainingTime / 60)}:${times.remainingTime % 60 < 10 ? 0 : ""}${times.remainingTime % 60}`}</section>

          <div className="symbols">
            <button id="start_stop" onClick={startstopCountdown}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 22v-20h2v20h-2zm-18 0l16-10-16-10v20z" /></svg>
            </button>
            <button id="reset" onClick={reset}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 9h2v11h-17v3l-6-4 6-4v3h15v-9zm-18-3h15v3l6-4-6-4v3h-17v11h2v-9z" /></svg>
            </button>
            <audio
              id="beep"
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
              type="audio/mpeg"
              preload="auto"
            >
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>

        <p id="by">by kygoskyrus</p>

      </div>

    </>
  );
}
//use src="beepSound.mp3" in audio elemnet to change the sound
export default App;
