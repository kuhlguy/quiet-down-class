import React, { useState } from 'react';

function RangeInput() {
  const [value, setValue] = useState(50); // Initial value of the range input

  // Function to handle changes in the range input
  const handleChange = (event) => {
    setValue(event.target.value); // Update the value in the state
  };

  return (
    <div>
      {/* Display the current microphone */}
      <p>Microphone Sensitivity: {value}</p>

      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={handleChange} 
      />
    </div>
  );
}

export default RangeInput;
