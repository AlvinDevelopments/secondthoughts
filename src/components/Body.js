import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router';
import Home from './Home';
import Messages from './Messages';
import Notifications from './Notifications';
import Profile from './Profile';
import LoginForm from './LoginForm';

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
                this is the Body
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/i/messages" component={Messages}/>
                    <Route exact path="/i/notifications" component={Notifications}/>
                    <Route exact path="/signin" component = {LoginForm}/>
                    <Route exact path="/:username" component={Profile}/>
                </Switch>
            </div>
        );
    }
}


export default Body;