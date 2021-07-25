import './App.css';
import { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css'

function App() {

  const apiURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  const color = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

  const [quotesList, setQuotesList] = useState([]);
  const [quote, setQuote] = useState({});

  const setRandomQuote = list => {

    let randomIndex = Math.floor(Math.random() * list.length);
    while (list[randomIndex].quote === quote.quote) {
      randomIndex = Math.floor(Math.random() * list.length);
    }
    setQuote(quotesList[randomIndex]);

    const clr = Math.floor(Math.random() * color.length);

    const body = document.getElementsByTagName('body')[0].style;
    const text = document.getElementById('text').style;
    const author = document.getElementById('author').style;
    const newQuote = document.getElementById('new-quote').style;
    const tweetQuote = document.getElementById('tweet-quote').style;

    body.backgroundColor = `${color[clr]}`;
    text.color = `${color[clr]}`;
    author.color = `${color[clr]}`;
    newQuote.backgroundColor = `${color[clr]}`;
    tweetQuote.backgroundColor = `${color[clr]}`;

    body.transition = '900ms';
    newQuote.transition = '900ms';
    tweetQuote.transition = '900ms';
  }

  //reach to api to get list of quotes
  useEffect(() => {
    if (quotesList.length === 0) {
      fetch(apiURL).then(res => res.json()).then(res => setQuotesList(res.quotes));
    } else {
      setRandomQuote(quotesList);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotesList]);

  return (
    <>
      <div id="quote-box">
        <p id="text"><i className="fa fa-quote-left"></i>  &nbsp;{quote.quote}</p>
        <div className="flex2">
          <p id="author">- {quote.author}</p>
        </div>
        <div className="flex3">
          <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
          <button id="new-quote" onClick={() => setRandomQuote(quotesList)}>New quote</button>
        </div>
      </div>
      <p className="name">by kygoskyrus </p>
    </>
  );
}

export default App;
