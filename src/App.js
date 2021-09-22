import "./app.scss";
import { useState, useEffect } from "react";
const axios = require("axios");

function App() {
  const [quoteObj, setQuoteObj] = useState({});
  const [allQuote, setAllQuote] = useState();
  const colors = [
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
  const [randomColor, setRandomColor] = useState("black");

   useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((response) => {
        setAllQuote(response.data);
        return response;
      })
      .then((response) => {
        setQuoteObj(
          response.data.quotes[
            Math.floor(Math.random(response.data.quotes.length) * 99)
          ]
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const newQuote = () => {
    setRandomColor(colors[Math.floor(Math.random(colors.length)*99)]);
    setQuoteObj(
      allQuote.quotes[Math.floor(Math.random(allQuote.quotes.length) * 99)]
    );
  };

  return (
    <div className="container-fluid">
      <div id="wrapper" style={{backgroundColor: randomColor}}>
        <div id="quote-box">
          <div id="quote-text">
            <i className="fa fa-quote-left" style={{color: randomColor}}> </i>
            <span id="text" style={{color: randomColor}}>{quoteObj.quote} </span>
          </div>
          <div id="quote-author" style={{color: randomColor}}>
            - <span id="author" style={{color: randomColor}}>{quoteObj.author} </span>
          </div>{" "}
          <div className="buttons">
            <a
            href = "twitter.com/intent/tweet"
              className="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_blank"
            >
              <i className="fab fa-twitter" style={{backgroundColor: randomColor}}> </i>
            </a>
            <button className="button" onClick={newQuote} id="new-quote" style={{backgroundColor: randomColor}}>
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
