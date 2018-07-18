import React, {Component} from 'react';

import Feed from './Feed';

import cookie from 'react-cookie';

import {withRouter} from 'react-router-dom';

import ProfileCard from './ProfileCard';

import  './components.css';

import Button from '@material-ui/core/Button';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile: null,
            posts: [],
            ownProfile: false
        };
    }

    componentDidMount(){
    }

    render(){

        var button = (
            <div>
                <Button>Follow</Button>
            </div>
        );

        console.log(window.location.pathname.split('/')[1]);
        console.log(cookie.load('userHandle'));

        if(window.location.pathname.split('/')[1]===cookie.load('userHandle')){
            button = (
                <div>
                    <Button>Edit Profile</Button>
                </div>
            );
        }

        return(
            <div>
                {button}
                <div className="profile">
                    
                    <ProfileCard className="sidebar"/>
                    <Feed className="feed" isHome={false} userHandle={this.props.location.pathname.split('/')[1]} />
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);