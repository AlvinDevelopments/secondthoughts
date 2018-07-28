import React, {Component} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {Switch} from 'react-router';
import HomeContainer from './HomeContainer';
import Messages from './Messages';
import Notifications from './Notifications';
import ProfileContainer from './ProfileContainer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import HashTagContainer from './HashTagContainer';
import ErrorPage from './ErrorPage';

// import PrivateRoute from './PrivateRoute';

import SearchResults from './SearchResults';

import cookie from 'react-cookie';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        cookie.load('isLoggedIn') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );



class Body extends Component {
    constructor(props){
        super(props);
    }

    render(){

        return (
            <div>
                <Switch>
                    <PrivateRoute exact path="/" component={HomeContainer}/>
                    <PrivateRoute exact path="/i/messages" component={Messages}/>
                    <PrivateRoute exact path="/i/notifications" component={Notifications}/>
                    <Route exact path="/search" component = {SearchResults}/>
                    <Route exact path="/signin" component = {LoginForm}/>
                    <Route exact path="/register" component = {RegisterForm}/>
                    <Route exact path="/:username" component={ProfileContainer}/>
                    <Route exact path="/hashtag/:hashtag" component={HashTagContainer} />
                    <Route path="/" component={ErrorPage} />
                </Switch>
            </div>
        );
    }
}


export default Body;