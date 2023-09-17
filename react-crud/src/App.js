import './App.css';
import Create from './components/create';
import Read from './components/read';
import Donate from './components/donate'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'


function App() {
  return (
    <Router>
    <div className="main">
      <h1 className="main-header">PantryPuzzle</h1>
      <div class="btns">
        <Button href="/create">Add your food</Button>
        <Button href="/read">Browse your stash</Button>
        <Button href="/donate">View donations</Button>

      </div>
      
      <div>
        <Routes>
        <Route path='/create' element={<Create />} />
        <Route path='/read' element={<Read />} />
        <Route path='/donate' element={<Donate />} />

        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
