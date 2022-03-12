import React, { useState, useEffect } from "react";
import './App.css';
import Button from './components/Button';
import SearchJoke from "./components/SearchJoke";
import SearchResults from "./components/SearchResults";

function App() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isJokeRequested, setIsJokeRequested ] = useState(false);
  const [loadedJoke, setLoadedJoke] = useState([]);

  /**
   * function to fetch the random jokes 
   */
  // function getJokes(){
  //   fetch(
  //     'https://icanhazdadjoke.com/',
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json"
  //       }
  //     }
  //   ).then(res => res.json()
  //   ).then(data => {
  //       console.log(data);
  //       setLoadedJoke(data.joke);
  //       setIsLoading(false);
  //     })
  //     .catch(error => console.log(error));
  // }

  /**
   * The code below schedules a new interval to run every  ten second inside of 
   * the useEffect Hook.
   * This will schedule once the React component mounts for the first time
   * To properly clear the interval, we return clearInterval from the useEffect Hook, passing in the interval.
   */
  
    useEffect(() => {
    /**
     * function to fetch the random jokes 
     */
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
            console.log(data);
            setLoadedJoke(data.joke);
            setIsLoading(false);
          })
          .catch(error => console.log(error));
      }
      getJokes()
      const interval = setInterval(() => getJokes(), 10000);
      return () => clearInterval(interval);
    }, []);

    /**
     * Function displays the joke text in the DOM
     */
    function handleJokeReq() {
      setIsJokeRequested(true);
    }
  

  return (
    <div className="App">
      <header className="App-header">
       <h2>Dad Jokes</h2>
      </header>
      <SearchJoke /> <Button onClickJokeFunction = {handleJokeReq}></Button>
        { isJokeRequested && <p>{loadedJoke}</p> }
    </div>
  );
}

export default App;
