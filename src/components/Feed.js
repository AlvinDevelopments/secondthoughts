import React, {Component} from 'react';
import './components.css';
import Post from './Post';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Button from '@material-ui/core/Button';

class Feed extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: []
        };
    }
    
    componentDidMount(){
        // GET Posts where id === id in following []

        // GET token 

        // fetch('https://api.twitter.com/oauth/access_token',{
        //     method: 'POST',
        //     mode: 'cors',
        //     headers : {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json; charset=UTF-8',
        //         // 'Authorization': token,
        //     },
        //     body: JSON.stringify({
        //         'oauth_verifier': 
        //     })
        // }).then(response => {
        //     console.log(response);
        //     return response.json()
        // } )
        // .then(jsondata => {
        //     this.setState({posts:jsondata});
        // });
        


        // var token = 


    //     fetch('',{
    //         method: 'GET',
    //         mode: 'cors',
    //         headers:{
    //             'Authorization': "OAuth oauth_consumer_key=\"HJuE1Sk6WjilI7GLOp4qd82er\", oauth_token=\"1011734384167145472-T7zHGqMWooHZAJ4YWgXWIZpCEoP7h9\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"1531544318\", oauth_nonce=\"us6rucnhdEn\", oauth_version=\"1.0\", oauth_signature=\"mFhS2RHpezhNYjj4fAyA9HuWeBY%3D\"",
    //             'Content-Type': 'application/json; charset=UTF-8'
    //         }
    //     }).then(response => {
    //         console.log(response);
    //         return response.json()
    //     } )
    //     .then(jsondata => {
    //         this.setState({posts:jsondata});
    //     });
    // }
    }





    render(){
        return (
            <div className={this.props.className}>
                the Feed <br/>
                {
                    this.state.posts.map((post)=>
                        <div key={post.id}>
                            <Divider/>
                            <Post avatar_url={post.avatar_url} id={post.login}/>
                        </div>
                    )
                }    
            </div>
        )
    }
}

export default Feed;