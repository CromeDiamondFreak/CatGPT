import './App.css';
import { useState } from 'react';

import { Configuration, OpenAIApi } from 'openai';

import ReactResponsiveSpritesheet from 'react-responsive-spritesheet';

// require('dotenv').config(); FOR SUBMISSION PURPOSES

const API_KEY = "INSERT API KEY HERE"; //FOR TESTING ONLY, FOR SUBMISSION PULL FROM .env

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

  const openAI = new OpenAIApi(new Configuration({
    apiKey: API_KEY //get from process.env for submission
  }));

  return (
    <div className="App">
      <ReactResponsiveSpritesheet image='../kittens_assets/kittens_gifs/kitten01_gifs/kitten01_idle_8fps.gif'/>
      <input onChange={event => setPrompt(event.target.value)} />
      <div onClick={() => {
        openAI.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [{role: "user", content: prompt}]
        }).then(res => {
          setReply(res.data.choices[0].message.content);
        });
      }}>Send Message</div>
      <div>{reply}</div>
    </div>
  );
}

export default App;
