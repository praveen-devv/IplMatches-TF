import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const [matchesList, setMatchesList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://gist.githubusercontent.com/hdck007/57650c774d9631c097db855bf110a4b6/raw/58b00de2a8c06831fda2f471e1b635a90208a4be/ipl.json');
   
      const data = await res.json();
      setMatchesList(data);
  }

  fetchData()
      .catch(console.error);
  }, [])
  return (
    <div className="App">
      <Header matchesList={matchesList} />
    </div>
  );
}

export default App;
