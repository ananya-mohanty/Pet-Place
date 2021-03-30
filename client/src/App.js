import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import { Provider } from 'react-redux'
import history from './history'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { NewPost } from './components/NewPost';
import { FeedPosts } from './components/FeedPosts';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Navbar />
      <NewPost/>
      <FeedPosts/>
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
    </div>
    </Provider>
  );
}

export default App;
