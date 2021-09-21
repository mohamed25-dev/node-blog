import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';

function App() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common = {'Authorization': token};

  return (
    <Router>
      <div>
        <Header />
        <div className="container">
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/createPost" component={CreatePost} />
              <Route exact path="/post/view/:id" component={ViewPost} />
              <Route exact path="/post/edit/:id" component={EditPost} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
