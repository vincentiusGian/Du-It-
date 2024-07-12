import logo from './logo.svg';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

function App() {
  function removeJsonHeader(responseString) {
    const startIndex = responseString.indexOf("[")-1 ; // Find opening curly brace
    const endIndex = responseString.lastIndexOf("]")+1; // Find closing curly brace
    return responseString.slice(startIndex, endIndex); // Extract content between braces
  }
  const [goals, setGoals] = useState("");
  const [value, setValue] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [cursav, setCursav] = useState("");
  const [custom, setCustom] = useState("");
  const [recipes, setRecipes] = useState([]);


  const [isClicked, setIsClicked] = useState(false);

  const onClickHandler = async () => {
    setIsClicked(true);
    console.log("clicked");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  // const prompt = `You are a financial advisor. The input '-' divides the prompt of price of the goals that users want to achieve. tell me step by step how to achieve ${goals} with ${income} per month with current savings Rp 5.000.000,00`

  const prompt = `
  You are a financial consultant. The output format is json.

    without the file header
  You are given :
    financial goal: ${goals},
    cost of goal: ${value},
    income per 1 month: ${income},
    expense per 1 month: ${expense},
    custom status of user: ${custom}.
  
    PLEASE JUST CONSIDER THE INPUT THAT RECEIVED. IF THE INPUT IS INSUFFICIENT, GO AHEAD WITH YOUR DATA.
  Please analyze and give user respond:
  Title, Step by step to achieve that goal, Recommendation.
  Make the response using this json format:
  [{ "type": "object",
    "properties": {
      "Title": { "type": "string" },
      "Steps": {"type": "string"},
      "Recommendation": {"type": "string"},
    }
  }]

  Each properties have their own title with large and bolded except "Title"!
  Make the markdown aligned to the left.

  
  `;

  // const result = await model.generateContent(prompt);
  // const response = await result.response;
  // const text = response.text();
  // console.log(text);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = await removeJsonHeader(response.text());
    
    console.log(data);

    const recipesList = JSON.parse(data);
    setRecipes(recipesList);
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  }
  }

 


const handleSubmit = (event) => {
    event.preventDefault();
  }
    

  

  function displayForm() {
    return (
      <>
      <div className='m-6 inblock p-5 gap-3'>
        <h1 className='text-5xl font-abc font-bold'>Achieve Your</h1> 
        <h1 className="text-5xl font-abc font-semibold text-skygreen">Financial Dreams</h1>
        <div className='flex justify-center pt-1'>
        <h4 className='text-m font-abc font-light  text-gray w-96 pb-5'>Answer These 5 Simple Questions to Receive Personalized Budgeting Tips Instantly!</h4>
        </div>
        <div className='items-center'>
        <span className='bg-skygreen bg-opacity-10 w-2/12 rounded-2xl p-2 text-s font-semibold text-skygreen font-abc'>Powered by AI</span>
        </div>
      </div>
      <div className="flex justify-center text-center">
      <form onSubmit={handleSubmit} className='items-center join join-vertical gap-2 font-abc w-2/6 text-xs bg-opacity-60 bg-FF pl-3 pr-3 pt-5'>
      <label className="form-control max-w-xs join-item w-full">
      <div className="label">
      <span className="label-text font-abc">What is your financial goal?</span>
      </div>
        <input placeholder="Example: buy a new house, etc" className="w-full max-w-xl input font-abc input-sm input-bordered"
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
      <span className="label-text">How much is your expense per month?</span>
      </div>
        <input placeholder="Example: Rp 5.000.000" className="input input-sm input-bordered w-full max-w-xs"
          type="text" 
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs join-item">  
      <div className="label">
      <span className="label-text text-left font-thin">How much is your current saving for this goal?</span>
      </div>
        <input placeholder="Example: Rp 105.000.000" className="input text-wrap input-sm input-bordered w-full max-w-xs"
          type="text" 
          value={cursav}
          onChange={(e) => setCursav(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs flex join-item pb-4">  
      <div className="label">
      <span className="label-text">Customize your current financial condition</span>
      </div>
      <textarea placeholder="Example: I still live with my parents."
          type="text"
          rows="4"
          cols="70"
          id='TXT'
          className='border-collapse w-full h-full row-span-4'
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          ></textarea>
      </label>
      <button type="submit" className="btn btn-primary" onClick={onClickHandler}>Submit</button>
    </form>
      </div>
      </>
    )
  }

  function displayResponse()
  {
    return (
      <div> 
        {recipes.length > 0 ? (
          <div>
            <h2>Generated Recipes:</h2>
            <div>
              {recipes.map((recipe, index) => (
                <h1 key={index} className="font-bold text-2xl" >{recipe.Title}</h1>
              ))}
            </div>
            <div className='join join-vertical lg:join-horizontal w-11/12 pt-20'>
            <div className=''>
              {recipes.map((recipe,index) => (
                <ReactMarkdown key={index} children={recipe.Steps}/>
              ))}
            </div>
            <div className=''>
              {recipes.map((recipe, index) => (
                <ReactMarkdown key={index} className="text-left" children={recipe.Recommendation}/>
              ))}
            </div>
            </div>
          </div>
        ) : (
            <h1>LOADING BOS</h1>
        )}
      </div>
    );
  }


  return (
    <main className="App">
      {!isClicked && displayForm()}
      {isClicked && displayResponse()}
      
    </main>
  );

}

export default App;
