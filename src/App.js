import './App.css';
// import Login from './login/Login';
import { connect } from "react-redux";
import { logoutAction } from "../src/app-store/actions/logoutAction";
import { loginAction } from "../src/app-store/actions/loginAction";
import { sideBarAction } from "../src/app-store/actions/sideBarAction";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Navbar from "./header/Navbar"
import Work from './work/Work'
import User from './user/User'
import Login from "./login/Login";
import Logout from "./logout/Logout";
import Customer from "./customer/Customer";
import { useStore } from 'react-redux'

function App() {
  const logIn = useStore().getState().appReducer['logIn'];
  const logOut = useStore().getState().appReducer['logOut'];

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          {/* {user === 'Annonymus User.!' ? '' : <Navbar />} */}
          {logIn ?
            <Navbar />
            : ''}
          {logOut ? `you are logged out.!` :
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/work" component={Work} />
              <Route path="/register" component={User} />
              <Route path="/customer" component={Customer} />
              <Route path="/logout" component={Logout} />
            </Switch>
          }
        </Router>
      </header>
    </div>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  loginAction: () => dispatch(loginAction),
  logoutAction: () => dispatch(logoutAction),
  sideBarAction: () => dispatch(sideBarAction)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
