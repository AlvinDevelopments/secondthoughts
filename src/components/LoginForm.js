import React, {Component} from 'react';

import cookie from 'react-cookie';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('/0.0/authenticate/signin',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username:this.state.username,
                password:this.state.password
            })
        }
        ).then((response) => response.json())
        .then(function(data){
            console.log(data);
            cookie.save('token',data.token);
            cookie.save('userid',data.userId);
            cookie.save('isLoggedIn',true);
        });
        
    }

    handleUserChange = (event) => {
        this.setState({username:event.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password:e.target.value});
    }

    render(){

        return( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    The login page.<br/>
                    Username <TextField onChange={this.handleUserChange}/><br/>
                    Password <TextField onChange={this.handlePasswordChange} type="password"/><br/>
                    <Button type="submit"> sign in </Button>
                </form>
            </div>
        )
    }
}

export default LoginForm;