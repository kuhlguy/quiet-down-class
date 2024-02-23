import { useState } from 'react';
import './App.css';
import Light from './Light'
import Audio from './Audio'

function App() {

  const [lightsArray, setLightsArray] = useState(
    [{
      id:1,
      color: 'red',
      on: false,
      emoji: 'sentiment_stressed'
    },
    {
      id:2,
      color: 'yellow',
      on: false,
      emoji: 'sentiment_neutral'
    },
    {
      id:3,
      color: 'green',
      on: false,
      emoji: 'sentiment_calm'
    }]
  )

  function switchLights(id) {
    setLightsArray(prevLights => {
      return prevLights.map((light) => {
        return light.id === id ? { ...light, on: true } : { ...light, on: false }
      })
    })
  }

  const lights = lightsArray.map(light => (
    <Light 
        key={light.id} 
        on={light.on}
        color={light.color}
        handleClick={() => switchLights(light.id)}
    />
))

//Add user control to adjust sensitivity
//volumeModifier = ;

//add positive reinforcement comments for extended quiet time
//different lights for "inside voices" vs full quiet learning time

  return (
    <div className="App">     
      <div className="light-container">
        {lights}
        <Audio switchLights={switchLights} />
      </div>
    </div>
  );
}

export default App;