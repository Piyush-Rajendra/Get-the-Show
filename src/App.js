import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPage/AdminPanel'
import HomePage from './components/MainPage/HomePage';
import Register from './components/Register';
import ManageMovie from './components/AdminPage/ManageMovie';
import ManageUser from './components/AdminPage/ManageUser';
import ProfilePage from './components/MainPage/ProfilePage';

function App() {

  
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the home page when not authenticated */}
          <Route exact path='/' element={<HomePage props={true}/>} />
          <Route exact path='/Login' element={<Login/>} />
          <Route exact path='/Register' element={<Register/>} />
          <Route exact path='/AdminPanel' element={<AdminPanel/>}/>
          <Route exact path='/ManageMovie' element={<ManageMovie/>}/>
          <Route exact path='/ManageUser' element={<ManageUser/>}/>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/HomePage' element={<HomePage movies={DUMMY_MOVIE}/>} />
          <Route exact path='/Profile' element={<ProfilePage/>}/>
        </Routes>
      </div>
    </Router>
    )
}

export default App;
