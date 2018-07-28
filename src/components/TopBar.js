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


class TopBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 0,
            postOpen: false,
            isLoggedIn: cookie.load('isLoggedIn') || false,
            anchorEl: null
        };
    }

    componentDidMount(){
    }

    handleChange = (event,value)=>{
        this.setState({value: value});
        let links = ["/","/i/notifications","/i/messages"];
        this.props.history.push(links[value]);
    };


    // toggles the post form modal
    handleViewChange = (event) => {
        this.setState((prevState => ({postOpen: !prevState.postOpen })));
    };

    
    handleProfile = (event) => {
        this.props.history.push('/'+cookie.load('userHandle'));
        window.location.reload();
    }

    // redirects to log in page
    handleLogIn = (event) => {
        console.log('handle log in');
        this.props.history.push("/signin");
    };

    // log out button handler
    handleLogOut = (event) => {
        cookie.save('isLoggedIn',false);
        cookie.save('token',null);
        cookie.save('userId',null);
        cookie.save('userHandle',null);
        this.props.history.push('/');
        window.location.reload();
    }

    // handles the user dropdown menu status
    handleClose = (event) => {
        this.setState({anchorEl:null});
    }

    // handles the user dropdown menu
    handleClick = (event) => {
        this.setState({anchorEl:event.currentTarget});
    }

    handleSearch = (event) => {
        event.preventDefault();
        console.log('searching...');
        // this.props.history.push('/search');
    }


    render(){

        const { classes } = this.props;

        const {anchorEl} = this.state;

        const styles = {
            root: {
                backgroundColor: 'turqoise'
            },
            title: {
                flex: 1
            },
            buttons:{
                flex: 2,
            },
            login:{
                paddingTop: '10px',
                flex: 2,
                textColor: 'white',
            },
          };

        var tabs = (
            <Tabs value={this.state.value} style={styles.buttons} onChange={this.handleChange} >
                <Tab style={{minWidth:100}} icon={<HomeIcon />} />
                <Tab style={{minWidth:100}} icon={<NotificationIcon />} />
                <Tab style={{minWidth:100}} icon={<MailIcon />} />
            </Tabs>
        );

        var rightButtons = (
            <div style={styles.login}>
                            <form style={{'display':'inline'}}
                            onSubmit={this.handleSearch}>
                            <TextField  
                                // className="top-bar-search"
                                placeholder=" Search"
                                // type= "submit"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <SearchIcon color="inherit"/>
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </form>
                            <IconButton onClick={this.handleClick} >
                                <AccountCircle/>
                            </IconButton>

                            <Menu
                            style={{'scroll':'auto'}}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            >
                                <b className="user-menu" >@{cookie.load('userHandle')} </b>
                                <Divider/>
                                <MenuItem onClick={this.handleProfile}>Profile </MenuItem>
                                <MenuItem onClick={this.handleLogOut}>Settings </MenuItem>
                                <Divider />
                                <MenuItem onClick={this.handleLogOut}>Logout </MenuItem>
                                
                            </Menu>


                            <Button color="inherit"
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={this.handleViewChange}>
                                Post
                            </Button>
                        </div>
        );

        if(!this.state.isLoggedIn){
            tabs = (
                <Tabs value={this.state.value} style={styles.buttons} onChange={this.handleChange} >
                    <Tab style={{minWidth:100}} icon={<HomeIcon />} />
                </Tabs>
            );

            rightButtons = (

                <div style={styles.login}>
                            <TextField  
                                placeholder="Search"
                                id="bootstrap-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <SearchIcon color="inherit"/>
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <Button onClick={this.handleLogIn}> log in </Button>
                        </div>
            )

        }

        

        return (
            <div className="top-bar" style={styles.root}>
                <AppBar style={{backgroundColor:'#368910'}}position="static">
                    <Toolbar>
                            {tabs}
                        <Typography variant="title" color="inherit" style={styles.title}>
                            <a style={{'textDecoration':'none','color':'inherit'}}href="/">BirdTextPosts</a>
                        </Typography>
                    {rightButtons}
                        
                    </Toolbar>
                </AppBar>

                <PostModal 
                isOpen = {this.state.postOpen}
                onViewChange={this.handleViewChange}
                />
            </div>
        )
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    button: {
        margin:theme.spacing.unit,
    },
    input: {
        display: 'none',
    }
});

export default withStyles(styles)(withRouter(TopBar));