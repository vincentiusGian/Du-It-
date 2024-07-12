import logo from './logo.svg';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactDOM from 'react-dom/client';
import { useState } from 'react';


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

function App() {

  const onClickHandler = async () => {
    console.log("clicked");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = `You are a financial advisor. The input '-' divides the prompt of price of the goals that users want to achieve. tell me step by step how to achieve ${goals} with ${income} per month with current savings Rp 5.000.000,00`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  }

  const [goals, setGoals] = useState("");
  const [income, setIncome] = useState("");
const handleSubmit = (event) => {
    event.preventDefault();
  }
    

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <label>Enter your desired goal:
        <input
          type="text" 
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
      </label>
      <label>Enter your income:
        <input
          type="text" 
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </label>
      <input type="submit" onClick={onClickHandler}/>

    </form>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
