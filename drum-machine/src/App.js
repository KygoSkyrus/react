import { useState, useEffect, useRef } from 'react';
import './App.css';


const bank1 = {
  'Q': {
    name: 'Heater 1',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  'W': {
    name: 'Heater 2',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  'E': {
    name: 'Heater 4',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  'A': {
    name: 'Heater 3',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  'S': {
    name: 'Clap',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  'D': {
    name: 'Open Hi-Hat',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  'Z': {
    name: 'Kick n Hat',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  'X': {
    name: 'Kick',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  'C': {
    name: 'Closed Hi-Hat',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
}

function Pad({ handleclick, element }) {

  return (
    <button
      type="button"
      className="drum-pad"
      onClick={handleclick}
      id={bank1[element]}
    >{element}
      <audio id={element} src={bank1[element].source} className="clip"></audio>
    </button>
  );
}

function Info({ power, setpower, volume, setvolume, display }) {

  if (!power) {
    display = "welcome";
  }
  return (
    <div className="info">
      <label id="pwr">
        <input type="checkbox" id='power' checked={power} onChange={() => setpower(!power)} />
        <span className='checkmark'>{power ? 'OFF' : 'ON'}</span>
      </label>
      <div id="display">{display}</div>
      <label id='vol'>
        <input type='range' min={0} max={1} step={0.01} id='volume' defaultValue={volume} onChange={e => setvolume(Number(e.target.value))} />
        <span id='volume-display'>Volume : {Math.round(volume * 100)}</span>
      </label>
    </div>
  );
}

function Pads() {

  const [power, setpower] = useState(true);
  const [volume, setvolume] = useState(0.5);

  const keypadcode = Object.keys(bank1);//returns  the Q,W,E inloop order
  const [display, setdisplay] = useState('welcome');
  const buttonBackground = '';
  const backgroundRef = useRef();

  const playsound = e => {
    const keyboardkey = e.key ? e.key.toUpperCase() : e.target.childNodes[1].id; //here is they e.target.childNodes[1].id is the id name o the pad

    //console.log(e.target.childNodes[1].id);
    if (e.key && !keypadcode.includes(keyboardkey)) return;
    setdisplay(bank1[keyboardkey].name);

    const audio = document.getElementById(keyboardkey);

    if (e.key) {
      const button = audio.parentElement;
      button.style.backgroundColor = "rgb(117, 115, 115)";
      backgroundRef.current = setTimeout(() => button.style.background = buttonBackground, 100);
    }

    audio.volume = volume;
    if (power) {
      audio.play();
    }
  }

  useEffect(() => {
    if (!power) {
      return;
    } else {
      window.addEventListener('keydown', playsound);
    }
    return () => window.removeEventListener('keydown', playsound);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [power, volume]);

  return (
    <>
      <div className="keys">
        {keypadcode.map((pad, idx) => {
          return (
            <Pad
              key={pad + idx}
              handleclick={playsound}
              power={power}
              element={pad}
            />
          );
        })}
      </div>
      <Info display={display} power={power} volume={volume} setpower={setpower} setvolume={setvolume} />
    </>
  )
}

function App() {
  alert("turn ON power to play");
  return (
    <>
      <div id="drum-machine">
        <Pads />
      </div>
      <p id="by">by kygoskyrus</p>
    </>
  );
}

export default App;
