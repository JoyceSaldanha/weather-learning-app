import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [city,setCity] = useState('');
  let [wDetails,setWdetails] = useState();
  let [isLoading,setIsLoading] = useState(false);
  // let [counter,setCounter] = useState(1);

  let getData = (event) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res) => res.json())
    .then((response) => {
      if(response.cod ==="404") {
        setWdetails(undefined);
      } else {
        setWdetails(response);
      }
      setIsLoading(false);
    })
    event.preventDefault();
    setCity('');
  }

  // useEffect(() => {
  //   console.log('hi');
  // },[counter])

  return (
    <div className="w-[100%] h-[100vh] bg-[#4aacb1]">
      {/* {counter}
      <button onClick={() => setCounter(counter+1)}>Count</button> */}
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple weather App</h1>
        <form onSubmit={getData}>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City name'></input> <button>Submit</button>
        </form>

        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="no" width={100} className={`${isLoading ? '' : 'hidden'}`}></img>
          {wDetails !== undefined ? 
          <>
            <h3>{wDetails.name} <span>{wDetails.sys.country}</span></h3>
            <h2>{wDetails.main.temp}</h2>
            <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} alt="no"></img>
            <p>{wDetails.weather[0].description}</p>
          </> :
          <h3>No Data</h3>
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
