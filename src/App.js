
import React from 'react';
import './App.css';
import Map from "./components/Map.js"
import TicTac from "./games/TicTac"
const App = () => {

  return (
    <>

      <div className="App">
        <header className="App-header">
          <p>
            MetaLand!
          </p>
          <Map />
          <TicTac />
        </header>
      </div>


    </>
  );
}

export default App;
