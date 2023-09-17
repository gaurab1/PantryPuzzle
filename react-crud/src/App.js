import './App.css';
import Create from './components/create';
import Read from './components/read';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="main">
      <h1 className="main-header">PantryPuzzle</h1>
      
      <div>
        <Routes>
        <Route path='/create' element={<Create />} />
        <Route path='/read' element={<Read />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
