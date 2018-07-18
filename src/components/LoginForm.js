import React, {Component} from 'react';

import cookie from 'react-cookie';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {withRouter} from 'react-router-dom';

class LoginForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        };
    }

    componentDidMount(){
        if(cookie.load('isLoggedIn')){
            this.props.history.push('/');
            window.location.reload();
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch('/0.0/authenticate/signin',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(this.state)
        }
        ).then((response) => response.json())
        .then((data)=>{
            console.log(data);
            console.log('lmao');
            cookie.save('token',data.token);
            cookie.save('userId',data.userId);
            cookie.save('userHandle',data.userHandle);
            cookie.save('isLoggedIn',true);
            this.props.history.push('/');
            window.location.reload();
        });
        
    }

    handleChange = (name, e) => {
        this.setState({[name]:e.target.value});
    }

    render(){

        return( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField id="username" label="Username" onChange={(e)=>this.handleChange('username',e)}/><br/>
                    <TextField id="password" label="Password" onChange={(e)=>this.handleChange('password',e)} type="password"/><br/>
                    <b style={{'color':'red'}} >lol </b>
                    <Button href="/register"> Register</Button><br/>
                    <Button color="inherit" variant="contained" type="submit"> sign in </Button>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm);