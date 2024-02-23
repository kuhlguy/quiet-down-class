import React, { useState, useEffect } from 'react';
import Settings from './Settings';

export function toggleSettings() {
  const settingsContainer = document.querySelector('.settings-container');
  settingsContainer.classList.toggle('slide-in');
  settingsContainer.classList.toggle('slide-out');
}

export default function Audio({ switchLights }) {
  const [volumeAvg, setVolumeAvg] = useState([]);
  const [stream, setStream] = useState(null); // Define stream as state

  useEffect(() => {
    let updateVolume;
    if (stream) {
      const audioContext = new AudioContext();
      const microphone = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      microphone.connect(analyser);

      updateVolume = () => {
        if (updateVolume) { // Check if updateVolume is defined
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((acc, value) => acc + value, 0) / bufferLength;
          setVolumeAvg(prevVolume => {
            let newVolume;
          
            if (prevVolume.length > 2000) {
              // Trim the array and add the new volume
              const trimmedVolume = prevVolume.slice(1000);
              newVolume = [...trimmedVolume, volume];
            } else {
              // Add the new volume to the existing array
              newVolume = [...prevVolume, volume];
            }
          
            return newVolume;
          });

          requestAnimationFrame(updateVolume);
        }
      };

      updateVolume();
    }

    return () => {
      // Clean up function to stop updating volume when the stream becomes null
      updateVolume = undefined;
    };
  }, [stream]); // Run this effect whenever the stream changes

  async function getMicrophoneInputAndVolume() {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(newStream); // Update stream state
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }

  function stopMicrophoneInputAndVolume() {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setStream(null); // Reset stream state
      console.log('Microphone input stopped.');
    } else {
      console.warn('Microphone input is not active.');
    }
  }
  
  function getAverageOfLast1000(array) {
    // Check if the array length is less than 1000
    if (array.length <= 1000) {
      // If the array length is less than or equal to 1000, calculate the average of all elements
      const sum = array.reduce((acc, value) => acc + value, 0);
      return sum / array.length;
    } else {
      // If the array length is greater than 1000, extract the last 1000 elements
      const last1000 = array.slice(-1000);
      // Calculate the sum of the last 100 elements
      const sum = last1000.reduce((acc, value) => acc + value, 0);
      // Calculate the average
      return sum / 1000;
    }
  }

  useEffect(() => {
    const avg = getAverageOfLast1000(volumeAvg)
    const lightLevel = parseFloat(avg.toFixed(2)) * 100
    console.log(lightLevel)
    if (lightLevel < 1000 || null) {
     switchLights(3)
    } else if (lightLevel < 3500) {
     switchLights(2)
    } else if (lightLevel > 3500) {
     switchLights(1)
    }

  }, [volumeAvg]); // Run the effect whenever volumeAvg changes
 
  return (
    <div className='footer-buttons'>
      <div className='buttons-container'>
        {!stream && <button className='controls play' onClick={getMicrophoneInputAndVolume}><span className="material-symbols-outlined">play_circle</span></button>}
        {stream && <button className='controls stop' onClick={stopMicrophoneInputAndVolume}><span className="material-symbols-outlined">stop_circle</span></button>}
        <button className='controls settings' onClick={toggleSettings}><span className="material-symbols-outlined">settings</span></button>
      </div>
      <Settings />
    </div>
  );
}
