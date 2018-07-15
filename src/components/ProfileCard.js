import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
            bannerImage: 'no image'
        }
    }

    render(){

        return (
            <div className="profile-card">
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.state.name}
                        </Typography>
                        <Typography gutterBottom variant="headline" component="h3">
                            {this.state.handle}
                        </Typography>
                        <div>
                            Tweets: {this.state.tweetCount}<br/>
                            Followers: {this.state.followerCount}<br/>
                            Following: {this.state.followingCount}<br/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default ProfileCard;