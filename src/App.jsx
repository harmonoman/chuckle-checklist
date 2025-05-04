import { useEffect, useState } from "react"
import { getAllJokes, postNewJoke } from "./services/jokeService"
import "./App.css"
import stevePic from "./assets/steve.png"

export const App = () => {
  const [jokeText, setJokeText] = useState("")
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])

  // helper to fetch and set allJokes
  const fetchAndSetAllJokes = async() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
  })}

  // initial render of allJokes
  useEffect(() => {
    fetchAndSetAllJokes();
  }, []) // ONLY runs on initial render of component

  // filter for untold jokes
  useEffect (() => {
      const untold = allJokes.filter(joke => joke.told === false);
      setUntoldJokes(untold);
  }, [allJokes])

  // filter for told jokes
  useEffect (() => {
    const told = allJokes.filter(joke => joke.told === true);
    setToldJokes(told);
  }, [allJokes])

  // handleSubmit for the Add button
  const handleSubmit = async () => {
    if(jokeText.trim() === "") return;
    await postNewJoke({text: jokeText, told: false})
    setJokeText("");
    fetchAndSetAllJokes();
  }

  // return html
  return (
    <div className="app-container">
      <div className="app-heading">
          <div className="app-heading-circle">
            <img className="app-logo" src={stevePic} alt="Good job Steve" />
          </div>
          <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={jokeText}
          placeholder="New One Liner"
          onChange={(event) => {
            setJokeText(event.target.value)
          }}
        />
        <button 
          className="joke-input-submit"
          onClick={() =>{
            console.log("jokeText: ", jokeText)
            handleSubmit()
          }} >Add</button>
      </div>

      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>  
            <span className="untold-count">{untoldJokes.length}</span>
            Untold
          </h2>
          {untoldJokes.map(joke => {return <li className="joke-list-item" key={joke.id}>{joke.text}</li>})}
        </div>
        <div className="joke-list-container">
          <h2>
            Told
            <span className="told-count">{toldJokes.length}</span>
          </h2>
          {toldJokes.map(joke => {return <li className="joke-list-item" key={joke.id}>{joke.text}</li>})}
        </div>
      </div>
    </div>)
}
