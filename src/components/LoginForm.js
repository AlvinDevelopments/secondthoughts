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
            message: ''
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
        ).then(response => response.json())
        .then((data)=>{
            if(data.token){
                console.log(data);
                cookie.save('token',data.token);
                cookie.save('userId',data.userId);
                cookie.save('userHandle',data.userHandle);
                cookie.save('isLoggedIn',true);
                this.props.history.push('/');
                window.location.reload();
            }
            else{
                console.log(data);
                // throw new Error('Something went wrong');
                // this.setState({message:'something went wrong!!'});
                this.setState({message:data.msg});
            }
        });
        
    }

    handleChange = (name, e) => {
        this.setState({[name]:e.target.value});
    }

    render(){

        return( 
            <form className= "body" onSubmit={this.handleSubmit}>
                    <TextField id="username" label="Username" onChange={(e)=>this.handleChange('username',e)}/><br/>
                    <TextField id="password" label="Password" onChange={(e)=>this.handleChange('password',e)} type="password"/><br/>
                    <div><b style={{'color':'red'}} >{this.state.message} </b></div>
                    <Button href="/register"> Register</Button><br/>
                    <Button color="inherit" variant="contained" type="submit"> sign in </Button>
                </form>
        )
    }
}



export default withRouter(LoginForm);