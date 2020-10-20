import React from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyLogo from "./Components/CurrencyLogo"
import ExchangeRate from "./Components/ExchangeRate"
import SVGraph1 from "./Components/SVGraph1"
import ParticleJS from "./Components/ParticleJS"

function App() {
  return (
    <div>
      {/* <ParticleJS /> */}
      <div style={{"textAlign" : "center", "marginTop" :"30px"}}>
        <ExchangeRate />
      </div>
    </div>
  );
}

export default App;
