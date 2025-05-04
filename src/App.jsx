import { useState } from "react"
import { postNewJoke } from "./services/jokeService"
import "./App.css"
import stevePic from "./assets/steve.png"



export const App = () => {
  const [jokeText, setJokeText] = useState("")

  const handleSubmit = async () => {
    if(jokeText.trim() === "") return;
    
    await postNewJoke({text: jokeText, told: false})
    setJokeText ("");
  }


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
            // What's the value of event?
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
    </div>)
}
