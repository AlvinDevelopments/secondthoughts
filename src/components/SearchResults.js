import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from'@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from'@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {withRouter} from 'react-router-dom';
import './components.css';

import cookie from 'react-cookie';

import PostModal from './PostModal';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import Divider from '@material-ui/core/Divider';

import PostContainer from './PostContainer';

class SearchResults extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            isHome: this.props.isHome || false,
            userHandle : this.props.userHandle || '',
            userId: this.props.userId || ''
        };
    }
    
    componentDidMount(){
        // search shit

        // fetch('/0.0/users/search')
        
    }

    render(){
        return (
            <div className={this.props.className}> <br/>
                {/* SEARCH PAGE for {window.location.pathname.split('?term=')[1]} */}
                SEARCH PAGE for {window.location.pathname.search}
            </div>
        )
    }
}

export default SearchResults;