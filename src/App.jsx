import logo from './logo.svg';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Loading from './loading.json';
import Lottie from 'lottie-react';
import robot1 from './robot1.svg';
import Footer from './components/Footer';
import robot2 from './robot2.svg';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

function App() {
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a financial consultant. The output format is json.

      without the file header
      You are given:
        financial goal: ${goals},
        cost of goal: ${value},
        income per 1 month: ${income},
        expense per 1 month: ${expense},
        custom status of user: ${custom}.
      
      PLEASE JUST CONSIDER THE INPUT THAT RECEIVED. IF THE INPUT IS INSUFFICIENT, GO AHEAD WITH YOUR DATA.
      Please analyze and give user respond:
      Title, Step by step to achieve that goal, Recommendation.
      Make the response using this json format (don't respond with markdown only for json):
      { "type": "object",
        "properties": {
          "Title": { "type": "string" },
          "Steps": {"type": "string"},
          "Recommendation": {"type": "string"},
        }
      }


      and wrap only with [], remove the markwodn.


      convert to string, remove all json word and backticks, convert to json without header again.

      Each properties have their own title with large and bolded except "Title"!
      Make the markdown aligned to the left. Don't forget that after every enumeration give line break.
      Enumerate the steps and recommendation

      Review before you respond. Remove the markdown only for code.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let data = await response.text();
      data = data.replace(/json/gm, "").replace(/`/g, "").trim();
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

  const handleBack = () => {
    setIsClicked(false);
    // Reset form state if needed
    setGoals("");
    setValue("");
    setIncome("");
    setExpense("");
    setCursav("");
    setCustom("");
    setRecipes([]);
  }

  function displayForm() {
    return (
      <div className='inblock p-5 gap-3'>
        <img src={robot2} alt="" width={200} height={200} className='m-auto pt-10' />
        <h1 className='text-5xl font-abc font-bold'>Achieve Your</h1>
        <h1 className="text-5xl font-abc font-semibold text-skygreen">Financial Dreams</h1>
        <div className='flex justify-center pt-1'>
          <h4 className='text-m font-abc font-light text-gray w-96 pb-5'>Answer These 5 Simple Questions to Receive Personalized Budgeting Tips Instantly!</h4>
        </div>
        <div className='items-center pb-4'>
          <span className='bg-skygreen bg-opacity-10 w-2/12 rounded-2xl p-2 text-s font-semibold text-skygreen font-abc'>Powered by AI</span>
        </div>
        <div className="flex justify-center text-center">
          <form onSubmit={handleSubmit} className='items-center w-full md:w-2/3 lg:w-1/2 xl:w-1/3 join join-vertical gap-2 font-abc text-xs bg-opacity-60 bg-FF pl-3 pr-3 pt-5'>
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
              <div className='text-center inline-block min-w[110px]'>
                <input placeholder="Example: Rp 5.000.000" className="input input-sm input-bordered w-full max-w-xs"
                  type="text"
                  value={expense}
                  onChange={(e) => setExpense(e.target.value)}
                />
              </div>
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
                <span className="label-text text-left">Customize your current financial condition</span>
              </div>
              <textarea placeholder="Example: I still live with my parents."
                type="text"
                rows="4"
                cols="70"
                id='TXT'
                className='input text-wrap input-xs text-xs font-medium input-bordered max-w-xs border-collapse w-full h-full row-span-4 border border-opacity-25 rounded-lg'
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              ></textarea>
            </label>
            <button type="submit"  className="btn text-white bg-skygreen btn-xs sm:btn-sm md:btn-md lg:btn-md w-full max-w-xs h-fit max-h-xs  p-3" onClick={onClickHandler}>Generate</button>
          </form>
        </div>
      </div>
    )
  }
  

  function displayResponse() {
    return (
      <div className='bg-my-image relative'>
        {recipes.length > 0 ? (
          <div>
            <h2>.</h2> {/* Placeholder */}
            <div className='m-2 pb-4 items-center'>
              <img src={robot1} alt="" width={200} height={200} className='m-auto pt-10' />
              {recipes.map((recipe, index) => (
                <h1 key={index} className="font-bold text-3xl font-abc">{recipe.properties.Title}</h1>
              ))}
            </div>
            <div className='items-center'>
              <span className='bg-skygreen bg-opacity-10 w-2/12 rounded-2xl p-2 text-s font-semibold text-skygreen font-abc'>Powered by AI</span>
            </div>
            <div className='relative m-auto join-vertical lg:join-horizontal w-11/12 pt-10 flex flex-wrap'>
              <div className='w-full lg:w-1/2 p-3'>
                <div className='bg-opacity-100 bg-FF p-3'>
                  <span className='bg-skygreen bg-opacity-10 h-full w-2/12 rounded-2xl p-2 text-s font-semibold text-skygreen font-abc'>Actions to Do</span>
                  {recipes.map((recipe, index) => (
                    <ReactMarkdown key={index} className="text-left m-5" children={recipe.properties.Steps} />
                  ))}
                </div>
              </div>
              <div className='w-full lg:w-1/2 p-3'>
                <div className='bg-opacity-100 bg-FF p-3'>
                  <span className='bg-skygreen bg-opacity-10 h-full w-2/12 rounded-2xl p-2 text-s font-semibold text-skygreen font-abc'>Recommendation</span>
                  {recipes.map((recipe, index) => (
                    <ReactMarkdown key={index} className="text-left m-5" children={recipe.properties.Recommendation} />
                  ))}
                </div>
              </div>
              <div className="flex align-middle m-auto items-center">
                <button type="button" className="btn text-white bg-skygreen btn-xs sm:btn-sm md:btn-md lg:btn-md mt-5" onClick={handleBack}>Back to Form</button>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex h-screen items-center'>
            <div className='m-auto'>
              <Lottie animationData={Loading} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="App bg-my-image bg-opacity-10">
      {!isClicked && displayForm()}
      {isClicked && displayResponse()}
      <Footer className="sticky top-0" />
    </main>
  );

}

export default App;
