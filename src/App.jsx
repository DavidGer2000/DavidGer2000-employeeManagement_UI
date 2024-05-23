import './App.css';
import { Route, Routes, BrowserRouter } from
  'react-router-dom';
  import Header from './components/header';
  import Adding from './components/adding'
  import Updating from './components/updating'
  import Viewing from './components/viewing'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/'  element={<h2>hello To Employee Mangagement System</h2>} />
          <Route path='/Adding' element={<Adding />} />
          <Route path='/Updating/:id' element={<Updating />} />
          <Route path='/Viewing/*' element={<Viewing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
