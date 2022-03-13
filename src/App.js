import React, { useState, useEffect } from "react";
import './App.css';
import SearchJoke from "./components/SearchJoke";
import SearchResults from "./components/SearchResults";
import { Provider as ReduxProvider } from "react-redux";
import appStore from "../src/lib/AppStore";


function App() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isJokeRequested, setIsJokeRequested ] = useState(false);
  const [loadedJoke, setLoadedJoke] = useState([]);
 
    /**
     * function to fetch the random jokes 
     */
      function handleJokeReq() {
          function getJokes(){
            fetch(
              'https://icanhazdadjoke.com/',
              {
                method: "GET",
                headers: {
                  Accept: "application/json"
                }
              }
            ).then(res => res.json()
            ).then(data => {
                setLoadedJoke(data.joke);
                setIsJokeRequested(true);
                setIsLoading(false);
              })
              .catch(error => console.log(error));
          }
          getJokes()
          /**
           * The code below schedules a new interval to run every  ten second
           * To properly clear the interval, we return clearInterval
           */
          const interval = setInterval(() => getJokes(), 10000);
          return () => clearInterval(interval);
      }
     
  return (
    <ReduxProvider store={appStore}>
      <div className="App">
        <header className="App-header">
        <h2>Dad Jokes</h2>
        </header>
        <div className="container">
          <div><SearchJoke /></div>
          <div className='actions'>
              <button type="button" onClick={handleJokeReq} >Get A Joke!</button>
          </div>
        </div>
          { isJokeRequested && <p>{loadedJoke}</p> }
      </div>
    </ReduxProvider>
  );
}

export default App;
