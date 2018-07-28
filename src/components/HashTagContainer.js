import React, {Component} from 'react';

import FeedContainer from './FeedContainer';

import cookie from 'react-cookie';

import {withRouter} from 'react-router-dom';

import  './components.css';

import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';

// components
import UserCard from './UserCard';
import { AppBar, Tabs, Tab } from '../../node_modules/@material-ui/core';

class HashTagContainer extends Component {

    constructor(props){
        super(props);
        this.state = props;
    }


    render(){
        return(
            <div className="body">
                Hashtag!!!
            </div>
        );
    }
}

export default HashTagContainer;