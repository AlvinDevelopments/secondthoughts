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
            password:'',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordretype: ''
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

        fetch('/0.0/authenticate/register',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(this.state)
        }
        ).then((response) => response.json())
        .then((data)=>{
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
                    <TextField id="firstname" label="First Name" onChange={(e)=>this.handleChange('firstname',e)}/><br/>
                    <TextField id="lastname" label="Last Name" onChange={(e)=>this.handleChange('lastname',e)}/><br/>
                    <TextField id="username" label="Username" onChange={(e)=>this.handleChange('username',e)}/><br/>
                    <TextField id="email" label="Email Address" onChange={(e)=>this.handleChange('email',e)}/><br/>
                    <TextField id="password" label="Password" onChange={(e)=>this.handleChange('password',e)} type="password"/><br/>
                    <TextField id="passwordretype" label="Confirm Password" onChange={(e)=>this.handleChange('passwordretype',e)} type="password"/><br/>
                    <Button color="inherit"  type="submit"> sign in </Button><br/>
                    <Button type="submit" variant="contained" > Register</Button>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm);