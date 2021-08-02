import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {withAuth0} from '@auth0/auth0-react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Profile from './Profile.js';
import Login from './Login.js';
import Bookshelf from './BestBooks.js'

class App extends React.Component {

  render() {
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {!this.props.auth0.isAuthenticated && 
                  <Login />}
                {this.props.auth0.isAuthenticated && 
                  <Bookshelf />}
              </Route>
              <Route exact path='/profile'>
                <Profile />
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
