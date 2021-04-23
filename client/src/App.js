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

function App() {
  return (
    <div className="App" style={{backgroundColor: 'whitesmoke'}}>
      <Router history={history}>
        <Provider store={store}>
        <Navbar />
          <Route exact path="/" render={(props) =>
            <div>
            <NewPost />
            <Feed/>
            </div>
          }></Route>
          <Route exact path="/donations" render={() =>
          <div>
            <NewDrive/>
            <DonationsPage />
          </div>
          }></Route>
          <Route exact path="/ngos" render={() =>
            <NgosPage />
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
      <Footer />
      </Provider>
      </Router>
    </div>
  );
}

export default App;
