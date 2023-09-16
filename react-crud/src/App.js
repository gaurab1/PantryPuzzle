import logo from './logo.svg';
import './App.css';
import foodSubmit from './handles/foodsubmit';
import { useRef } from 'react';
import Create from './components/create';


function App() {
  const dataRef = useRef()
 
  const submithandler = (e) => {
    e.preventDefault()
    foodSubmit(dataRef.current.value)
    dataRef.current.value = ""
  }
 
  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type= "text" ref={dataRef} />
        <button type = "submit">Save</button>
      </form>
    </div>
  );
}
 
export default App;


// function App() {
// // Maybe need to add Firebase and firestore stuff here?

//   return (
//     <div className="main">
//       <h1 className="main-header">PantryPuzzle</h1>
//       <div>
//         <Create/>
//       </div>

//     </div>
//   );
// }

// export default App;

