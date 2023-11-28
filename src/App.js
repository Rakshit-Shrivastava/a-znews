import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/a-znews' element={<News category='world' key='world' />} />
          <Route exact path='/business' element={<News category='business' key='business' />} />
          <Route exact path='/entertainment' element={<News category='entertainment' key='entertainment' />} />
          <Route exact path='/health' element={<News category='health' />} key='health' />
          <Route exact path='/science' element={<News category='science' key='science' />} />
          <Route exact path='/sports' element={<News category='sports' />} key='sports' />
          <Route exact path='/technology' element={<News category='technology' key='technology' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
