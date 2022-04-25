import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Theme/css/theme-dark.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

//Pages
import { Home } from './Pages';

//Components
import { NavigationBar } from './Components';

function App({ githubState }) {
  return (
    <>
      <Router>
        <NavigationBar />
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={300}
              classNames="fade"
            >
              <Switch location={location} >
                <Route path='/' exact component={Home} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </Router>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    githubState: state.githubState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

