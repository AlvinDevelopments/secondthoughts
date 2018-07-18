import React, {Component} from 'react';
import './components.css';
import Post from './Post';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Button from '@material-ui/core/Button';

import cookie from 'react-cookie';

class Feed extends Component {

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

        // fetch home if home prop is true
        if(this.props.home){
            let token = 'Bearer '+cookie.load('token');
            fetch('/0.0/posts/home_timeline',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            })
            .then(response => response.json())
            .then((data)=>{
                this.setState({posts:data});
            });
        }
        else{
            console.log('looking up name');
            fetch('/0.0/users/lookup_name/'+this.state.userHandle,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response=>response.json())
            .then((data) => {
                fetch('/0.0/posts/user_timeline?id='+data._id,{
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then((data)=>{
                    console.log(data);
                    this.setState({posts:data.reverse()});
                });

            })
        
        }
    }

    render(){
        return (
            <div className={this.props.className}> <br/>
                {
                    this.state.posts.map((post)=>
                        <div key={post._id}>
                            <Divider/>
                            <Post id={post._id}/>
                        </div>
                    )
                }    
            </div>
        )
    }
}

export default Feed;