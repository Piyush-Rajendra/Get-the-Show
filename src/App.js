import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel'
import HomePage from './components/HomePage';

function App() {
  const DUMMY_MOVIE = [
    {
      id: 'Interstellar',
      title: 'Interstellar',
      date: new Date('2015/2/21').toLocaleDateString(),
      img: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fs.abcnews.com%2Fimages%2FTechnology%2Fht_interstellar_2_kab_141106_16x9_1600.jpg&tbnid=lHqWrSPz51rHfM&vet=12ahUKEwj6n6PH0beEAxW4pokEHTdICxQQMygEegQIARB-..i&imgrefurl=https%3A%2F%2Fabcnews.go.com%2FTechnology%2Fnasas-real-interstellar-mission-save-earth-find-home%2Fstory%3Fid%3D26729590&docid=6Qp2J6NJ4HrdHM&w=1600&h=900&q=interstellar&ved=2ahUKEwj6n6PH0beEAxW4pokEHTdICxQQMygEegQIARB-',
      summary: 'Good ass fucking movie it will make u shit urself all over hahahaha'
    }

  ]
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the home page when not authenticated */}
          <Route exact path='/' element={<Login />} />
          <Route exact path='/HomePage' element={<HomePage movies={DUMMY_MOVIE}/>} />
        </Routes>
      </div>
    </Router>
    )
}

export default App;
