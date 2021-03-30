import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store'
import { Provider } from 'react-redux'
import history from './history'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Navbar />
      hello wtf
      {/* <Router history={history}>
        <Provider store={store}>
          <Navbar />
          <Route exact path="/" render={() =>
              <div>hello</div>
              // <MainPage />
            }></Route>
        </Provider>
      </Router> */}
    </div>
    </Provider>
  );
}

export default App;
