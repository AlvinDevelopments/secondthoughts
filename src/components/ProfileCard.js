import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import cookie from 'react-cookie';

class ProfileCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: 'Alvin',
            handle: '@AlvinLiiii',
            tweetCount: 2,
            followingCount: 6,
            followerCount: 2,
            profileImage: 'no image',
            bannerImage: 'no image',
            user: ''
        }
    }

    componentDidMount(){

        // fetch profile info
        var token = 'Bearer '+cookie.load('token');

        fetch('/0.0/users/lookup/'+cookie.load('userId'),{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(response=>response.json())
        .then((data)=>{
            console.log('success');
            console.log(data);
            this.setState({user:data});
        })
    }

    render(){

        return (
            <div className="profile-card">
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.state.user.firstname} <span/>{this.state.user.lastname} 
                        </Typography>
                        <Typography gutterBottom variant="headline" component="h3">
                            {this.state.user.handle}
                        </Typography>
                        <div>
                            Tweets: {this.state.user.tweetCount}<br/>
                            Followers: {this.state.user.followerCount}<br/>
                            Following: {this.state.user.followingCount}<br/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default ProfileCard;