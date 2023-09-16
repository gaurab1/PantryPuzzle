
import Create from './components/create';
// import Read from './components/read';
import foodSubmit from './handles/foodsubmit';
import { useRef } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import logo from './logo.svg';

function submitformtemp() {
  const foodItem = useRef()
  const expDate = useRef()
 
  const submithandler = (e) => {
    e.preventDefault()
    foodSubmit(foodItem.current.value, expDate.current.value)
    foodItem.current.value = ""
    expDate.current.value = ""
  }
 
  return (
    <div className="submitformtemp">
      <form onSubmit={submithandler}>
        <input type= "food-item" ref={foodItem} />
        
        <input type= "exp-date" ref={expDate} />
        <button type = "submit">Save</button>
      </form>
    </div>
  );
}
export default submitformtemp;

/////////

// function App() {
//   const dataRef = useRef()

//   const submithandler = (e) => {
//     e.preventDefault()
//     foodSubmit(dataRef.current.value)
//     dataRef.current.value = ""
//   }


//   return (
//     <Router>
//     <div className="main">
//       <h1 className="main-header">PantryPuzzle</h1>
//       <div>
        
//         <Routes>
//         <Route path='/create' element={<Create />} />
//         <Route path='/read' element={<Read />} />
//         </Routes>
//       </div>
//     </div>
//     </Router>
//   );
// }




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

