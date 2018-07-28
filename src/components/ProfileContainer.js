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

class ProfileContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile: null,
            posts: [],
            ownProfile: false,
            userId: '',
            isFollowing: false,
            user: {
                username: 'USER_NAME',
                firstname: 'FIRST_NAME',
                lastname: 'LAST_NAME',
                bio: 'USER_BIO',
                handle: '@USER_HANDLE',
                joinDate: 'Jul 29 2018',
                location: 'Calgary, Alberta',
                postCount:'49.7K',
                followerCount:'43.8K',
                followingCount:'1,075',
                likeCount:'15K',
            },
            error: false,
            tab: "one",
        };
    }

    componentDidMount(){
        document.title = this.props.location.pathname.split('/')[1];
        if(this.props.location.pathname.split('/')[1]==cookie.load('userHandle')){
            this.setState({ownProfile:true});
        }

        fetch('/0.0/users/lookup_name/'+this.props.location.pathname.split('/')[1],{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>{
            if(response.status===200){
                return response.json();
            }
            else{
                this.setState({error:true});
                return false;
            }
        })
        .then((data)=>{
            this.setState({user:data});

            fetch('/0.0/friendships/check?user_id='+data._id,{
                method:'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+cookie.load('token')
                }
            })
            .then(response=>response.json())
            .then((data)=>{
                console.log(data.isFollowing);
                this.setState({isFollowing: data.isFollowing});
            });


        });
    

            
    }

    handleFollow = (event) => {
        console.log('handle follow');
        var endpoint = this.state.isFollowing ? '0.0/friendships/destroy?user_id=' : '0.0/friendships/create?user_id='
        // TO DO: Fetch follow/unfollow (subscribe)
        fetch(endpoint+this.state.user._id,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+cookie.load('token')
            }
        })
        .then(this.setState((prevState => ({isFollowing:!prevState.isFollowing}))));
    }

    handleEdit = (event) => {
        // Opens edit modal to edit profile info
    }

    handleTabChange = (event, value) => 
    {
        event.preventDefault();
        this.setState({tab:value});
    }

    render(){

        if(this.state.error){
            return (
                <ErrorPage />
            )
        }

        var followText = '';
        if(this.state.ownProfile){
            followText = 'EDIT PROFILE';
        }
        else{
            followText = this.state.isFollowing ? 'FOLLOWING' : 'FOLLOW';
        }

        return(

           
            <div className="body">

                <div className="top-header">
                        <div className="profile-banner"><img className="banner-img" src="https://res.cloudinary.com/secondthoughts/image/upload/v1532408063/samples/landscapes/architecture-signs.jpg"/>The banner image.</div>
                            <div className="user-info">

                                <div className="left-placeholder">
                                    <div className="type1 circleBase"><img className="profile-img" src="https://res.cloudinary.com/secondthoughts/image/upload/v1532408055/samples/people/smiling-man.jpg"/></div>
                                </div>

                                    <div className="button-group">
                                        <a href="" onClick={(e)=>this.handleTabChange(e,"one")}><div className="info-button">Posts<div className="user-info-values">{this.state.user.postCount || '49K'}</div></div></a>
                                        <a href="" onClick={(e)=>this.handleTabChange(e,"two")}><div className="info-button">Following<div className="user-info-values">{this.state.user.followingCount || '69K'}</div></div></a>
                                        <a href="" onClick={(e)=>this.handleTabChange(e,"three")}><div className="info-button">Followers<div className="user-info-values">{this.state.user.followerCount || '1,095'}</div></div></a>
                                        <a href="" onClick={(e)=>this.handleTabChange(e,"four")}><div className="info-button">Likes<div className="user-info-values">{this.state.user.likeCount || '15K'}</div></div></a>
                                    </div>



                                    <div className="follow-button">
                                        <Button color="inherit"
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleFollow}>
                                                {followText}
                                        </Button>
                                    </div>
                            
                        </div>
                </div>


                <div className="homepage">
                    
                    <div className="sidebar">
                        <UserCard user={this.state.user}/>
                        <Divider /><br/>
                    </div>
                    {
                        this.state.tab==="one" && this.state.user._id ? <FeedContainer isHome={false} userHandle={this.state.user.handle} userId={this.state.user._id}/> 
                        : <div className="feed">OTHER SHIT</div>
                    }
                    <div className="sidebar">
                        
                    </div>
                </div>
            </div>
        )
    }
}

const ErrorPage = props => 
<div className="body">
    ERROR CANT FIND PAGE 
</div>

export default withRouter(ProfileContainer);