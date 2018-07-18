import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router';
import Home from './Home';
import Messages from './Messages';
import Notifications from './Notifications';
import Profile from './Profile';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import PrivateRoute from './PrivateRoute';

class Body extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn : false
        }
    }

    render(){

        return (
            <div className="body">
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute exact path="/i/messages" component={Messages}/>
                    <PrivateRoute exact path="/i/notifications" component={Notifications}/>
                    <Route exact path="/signin" component = {LoginForm}/>
                    <Route exact path="/register" component = {RegisterForm}/>
                    <Route exact path="/:username" component={Profile}/>
                </Switch>
            </div>
        );
    }
}


export default Body;