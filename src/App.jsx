// quiz ki category or difficulty 2no bh browser par lani ha
// timer end 10sec par color change ya warning de ya last 10sec me backgr color change 
// time end par ap k quetion ka correct anser ha wo show ho
//next button par disabled krna ha option par click na ho to disabled otherwise able 
  import './App.css';
  import Assets from '../src/Assets/d73449313ecedb997822efecd1ee3eac.gif'
  import { useEffect, useState } from 'react';

  function App() {

    const [qustion, setQustion] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [result, setResult] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
    const [score, setScore] = useState(0)

    useEffect(() => {
      getData()
    }, [])

    function getData() {//idhr neechy .catch bh lgana ha api ka takay net band ya crash hone ki surat me catch wala error ender ho jaye
      fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        
        res.map(function (items){
          items.options = [items.correctAnswer, ...items.incorrectAnswers]
          items.options = shuffle(items.options)
        })
        
        setQustion(res)
      })
    }

    function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  //qustion == ''   or   qustion == 0   or   !qustion.length  3no loader ki condit ha 1 he km ha 3no ka
    if (!qustion.length) { 
      return <div className='imgLoader'>
        <img src={Assets} />
      </div>
    }

    function next() {
      setCurrentIndex(currentIndex + 1)

      if (currentIndex === qustion.length -1) {
        setResult(true)
      }
      setSelectedOption(null) // Reset selected option when moving to the next question
    }

    function restart() {
      setCurrentIndex(0)
      setResult(false) //restart button click par result false ho jaye
    }

    const currentQuestion = qustion[currentIndex]

    return (
      <div className="App">
        <div>Quiz App</div>

    { !result ?
      <div>

        <h4>{currentIndex + 1}) {currentQuestion.question.text}</h4>

        {currentQuestion.options.map(function (items) {
          return (<div> 
            <input type="radio" value={items} name='options' 
            onClick={() => setSelectedOption(items)} // Update selected option
            checked={selectedOption === items} // Check if the option is selected
            />
            {items}
          </div>)
        })}

        <button onClick={next} disabled={!selectedOption}>Next</button> {/* Disable the Next button if no option is selected */}
      </div>
      :
      <div>
        <h2>Result</h2>
        <button onClick={restart}>Restart</button>
      </div>
      }

      </div>
    );
  }

  export default App;
//javscript ka shuffle option code ract me bh kam karega koe bh kam ho jo net sy chahye ho to visit stack overflow web

// function shuffle(array) {
//   let currentIndex = array.length,  randomIndex;

//   // While there remain elements to shuffle.
//   while (currentIndex > 0) {

//     // Pick a remaining element.
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex], array[currentIndex]];
//   }

//   return array;
// }

// {currentQuestion.category}
// <h5>{currentQuestion.difficulty}</h5>
// ------------------------------------------------------------------------------




// import './App.css';
// import Assets from '../src/Assets/d73449313ecedb997822efecd1ee3eac.gif';
// import { useEffect, useState } from 'react';

// function App() {

//   const [qustion, setQustion] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [result, setResult] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     getData();
//   }, []);

//   function getData() {
//     fetch('https://the-trivia-api.com/v2/questions')
//     .then(res => res.json())
//     .then(res => {
//       console.log(res);
      
//       res.map(function (items){
//         items.options = [items.correctAnswer, ...items.incorrectAnswers];
//         items.options = shuffle(items.options);
//       });
      
//       setQustion(res);
//     });
//   }

//   function shuffle(array) {
//     let currentIndex = array.length, randomIndex;

//     while (currentIndex > 0) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;

//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]
//       ];
//     }

//     return array;
//   }

//   if (!qustion.length) {
//     return (
//       <div className='imgLoader'>
//         <img src={Assets} alt="Loading..." />
//       </div>
//     );
//   }

//   function next() {
//     setCurrentIndex(currentIndex + 1);

//     if (currentIndex === qustion.length - 1) {
//       setResult(true);
//     }
//     setSelectedOption(null); // Reset selected option when moving to the next question
//   }

//   function restart() {
//     setCurrentIndex(0);
//     setResult(false);
//   }

//   const currentQuestion = qustion[currentIndex];

//   return (
//     <div className="App">
//       <div>Quiz App</div>

//       {!result ? (
//         <div>
//           <h4>{currentIndex + 1}) {currentQuestion.question.text}</h4>

//           {currentQuestion.options.map(function (items, index) {
//             return (
//               <div key={index}>
//                 <input
//                   type="radio"
//                   value={items}
//                   name='options'
//                   onChange={() => setSelectedOption(items)} // Update selected option
//                   checked={selectedOption === items} // Check if the option is selected
//                 />
//                 {items}
//               </div>
//             );
//           })}

//           <button onClick={next} disabled={!selectedOption}>Next</button> {/* Disable the Next button if no option is selected */}
//         </div>
//       ) : (
//         <div>
//           <h2>Result</h2>
//           <button onClick={restart}>Restart</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
