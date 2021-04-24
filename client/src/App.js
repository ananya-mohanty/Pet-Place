import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import { Provider } from 'react-redux'
import history from './history'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { NewPost } from './components/NewPost';
import { Feed } from './components/Feed';
import { DonationsPage } from './pages/DonationsPage'
import { NgosPage } from './pages/NgosPage'
import NewDrive from './components/NewDrive'
import Login from './components/Login'
import Register from './components/Register'
import { LostPetPage } from './pages/LostPetPage'
import LostPet from './components/LostPet'
import FoundPet from './components/FoundPet'
import { FoundPetPage } from './pages/FoundPetPage'
import backgroud from './images/resources/background1.jpg'


function App() {
  return (
    <div className="App" style={{backgroundColor: 'whitesmoke'}}>
      <Router history={history}>
        <Provider store={store}>
          <Route exact path="/login" render={() =>
            <div style={{backgroundColor: 'white'}}>
            <Login />
            </div>
          }></Route>
          <Route exact path="/register" render={() =>
            <div style={{
              backgroundImage: `url(${backgroud})`,
              backgroundSize: 'cover',
              overflow: 'hidden',
              height: window.innerHeight}}>
            <Register />
            </div>
          }></Route>
          <Route exact path="/" render={(props) =>
          store.getState().auth.user!=null?
            <div>
            <Navbar />
            <NewPost />
            <Feed/>
            <Footer />
            </div>:window.location.href='/login'
          }></Route>
          <Route exact path="/donations" render={() =>
          <div>
            <Navbar />
            <NewDrive/>
            <DonationsPage />
            <Footer />
          </div>
          }></Route>
          <Route exact path="/ngos" render={() =>
            <div>
            <Navbar />
            <NgosPage />
            <Footer />
            </div>
          }></Route>
          <Route exact path="/lostpet" render={() =>
          <div>
            <Navbar />
            <LostPet/>
            <LostPetPage />
            <Footer />
          </div>
          }></Route>
          <Route exact path="/foundpet" render={() =>
            <div>
              <Navbar />
              <FoundPet />
              <FoundPetPage />
              <Footer />
            </div>
          }></Route>
          
        
      {/* <Router history={history}>
        <Provider store={store}>
          <Navbar />
          <Route exact path="/" render={() =>
              <div>hello</div>
              // <MainPage />
            }></Route>
        </Provider>
      </Router> */}
      
      </Provider>
      </Router>
    </div>
  );
}

export default App;
