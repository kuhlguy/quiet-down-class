// Function that return average of an array.
function average(a, n) {
  // Find sum of array element
  var sum = 0;
  for (var i = 0; i < n; i++) sum += a[i];
  return parseFloat(sum / n);
}

//Add user control to adjust sensitivity
//volumeModifier = ;

function checkLevels(val) {
  //console.log('checkLevels:'+val);
  //add user input multiplier here
   if (val < 500  || null) {
    console.log('green');
  } else if (val < 1500) {
    console.log('yellow');
  } else if (val > 1500) {
    console.log('red');
  }

}

// check audio levels
function startr(){
    console.log ("starting...");
    const runningValue = new Array();
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
     navigator.getUserMedia({
         audio: true
       },
       function(stream) {
         let audioContext = new AudioContext();
         let analyser = audioContext.createAnalyser();
         let microphone = audioContext.createMediaStreamSource(stream);
         let javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

         analyser.smoothingTimeConstant = 0.8;
         analyser.fftSize = 1024;

         microphone.connect(analyser);
         analyser.connect(javascriptNode);
         javascriptNode.connect(audioContext.destination);

        let soundAverage = new Array();

         javascriptNode.onaudioprocess = function() {
             var array = new Uint8Array(analyser.frequencyBinCount);
             analyser.getByteFrequencyData(array);
             var values = 0;

             var length = array.length;

             for (var i = 0; i < length; i++) {
               values += (array[i]);
             }

             var average = values / length;
             let currentValue = Math.trunc(average*100);

             //create a function to calculate a base average
             //use this value to set the red, yellow and green light levels

             if (soundAverage.length > 350) {
                soundAverage.length = 0;
                //dont just reset to zero, trim array to keep X number of newest entries
                soundAverage.push(currentValue);
             } else {
                 soundAverage.push(currentValue);
             }
           }

           var arr = soundAverage;
           var n = arr.length;

//           console.log(JSON.stringify(soundAverage));

           var n = soundAverage.length;
           let sendToLights = average(soundAverage, n);

           checkLevels(sendToLights);         

           setInterval(() => {
               var n = soundAverage.length;
               sendToLights = average(soundAverage, n);
               checkLevels(sendToLights);
           }, 1000);
           // end fn stream
       },
       function(err) {
         console.log("The following error occured: " + err.name)
       });
   } else {
     console.log("getUserMedia not supported");
    }

}

//add positive reinforcement comments for extended quiet time
//different lights for "inside voices" vs full quiet learning time
   