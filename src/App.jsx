import logo from './logo.svg';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactDOM from 'react-dom/client';
import { useState } from 'react';


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

function App() {
  
  const [recipes, setRecipes] = useState([]);

  const onClickHandler = async () => {
    console.log("clicked");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  // const prompt = `You are a financial advisor. The input '-' divides the prompt of price of the goals that users want to achieve. tell me step by step how to achieve ${goals} with ${income} per month with current savings Rp 5.000.000,00`

  const prompt = `
  List 5 popular cookie recipes using this JSON schema:
  { "type": "object",
    "properties": {
      "recipe_name": { "type": "string" },
      "budget": {"type": "string"},
    }
  } 

  please output it without markdown layout but start with []
  `;

  // const result = await model.generateContent(prompt);
  // const response = await result.response;
  // const text = response.text();
  // console.log(text);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = await response.text();
    console.log(data);

    const recipesList = JSON.parse(data);
    setRecipes(recipesList);
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  }
  }

  const [goals, setGoals] = useState("");
  const [value, setValue] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [cursav, setCursav] = useState("");
  const [custom, setCustom] = useState("");


const handleSubmit = (event) => {
    event.preventDefault();
  }
    

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className='join join-vertical'>
      <label className="form-control w-full max-w-xs join-item">
      <div className="label">
      <span className="label-text">What is your financial goal?</span>
      </div>
        <input placeholder="Example: buy a new house, study abroad, etc" className="input input-sm input-bordered w-full max-w-xs"
          type="text" 
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs join-item">  
      <div className="label">
      <span className="label-text">What is the value of your goal?</span>
      </div>
        <input placeholder="Example: Rp 250.000.000" className="input input-sm input-bordered w-full max-w-xs"
          type="text" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs join-item">  
      <div className="label">
      <span className="label-text">How much is your income per month?</span>
      </div>
        <input placeholder="Example: Rp 25.000.000" className="input input-sm input-bordered w-full max-w-xs"
          type="text" 
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs join-item">  
      <div className="label">
      <span className="label-text">How much is your income per month?</span>
      </div>
        <input placeholder="Example: Rp 5.000.000" className="input input-sm input-bordered w-full max-w-xs"
          type="text" 
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs join-item">  
      <div className="label">
      <span className="label-text">How much is your current saving for this goal?</span>
      </div>
        <input placeholder="Example: Rp 105.000.000" className="input input-sm input-bordered w-full max-w-xs"
          type="text" 
          value={cursav}
          onChange={(e) => setCursav(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs join-item">  
      <div className="label">
      <div className="label-text">How much is your income per month?</div>
      </div>
        <input placeholder="Example: I still live with my parents, but I need to provde stable income" className="input input-lg text-sm input-bordered w-full max-w-xs"
          type="text" 
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      </label>
      <input type="submit" onClick={onClickHandler}/>

    </form>
    <div>
        {recipes.length > 0 ? (
          <div>
            <h2>Generated Recipes:</h2>
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>{recipe.recipe_name}</li>
              ))}
            </ul>
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>{recipe.budget}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No recipes generated yet. Click the button above to generate.</p>
        )}
      </div>
    </div>
  );
}

export default App;
