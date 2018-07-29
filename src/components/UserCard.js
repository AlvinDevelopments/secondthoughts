import React, {Component} from 'react';
import './components.css';

// imports for card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PinDropIcon from '@material-ui/icons/PinDrop'
import PublicIcon from '@material-ui/icons/Public'


export const HomeCard = (props) =>
<div className="feed-card">
    <Card>
        <div className="card-banner">lol</div>
        <div className="card-profile-img">image</div>
        <div className="name-handle"><b>{props.user.firstname} {props.user.lastname}</b><br/>@{props.user.handle}</div>
        <div className="card-stats">
            <a href={"/"+props.user.handle} onClick={(e)=>this.handleTabChange(e,"one")}><div className="info-button">Posts<div className="user-info-values">{props.user.postCount || 30}</div></div></a>
            <a href={"/"+props.user.handle+"/following"} onClick={(e)=>this.handleTabChange(e,"two")}><div className="info-button">Following<div className="user-info-values">{props.user.friendCount || 50}</div></div></a>
            <a href={"/"+props.user.handle+"/followers"} onClick={(e)=>this.handleTabChange(e,"three")}><div className="info-button">Followers<div className="user-info-values">{props.user.followerCount || 60}</div></div></a>
        </div>
    </Card>
</div>

const UserCard = (props) => 
        <div className="profile-card">
            <Card raised={false} >
                <CardContent>
                    <Typography variant="title" component="h1">
                        {props.user.firstname} <span/>{props.user.lastname} 
                    </Typography>
                    <Typography gutterBottom component="h4">
                        @{props.user.handle}
                    </Typography>
                    <Typography gutterBottom>{props.user.bio}</Typography>
                    <Typography gutterBottom>{props.user.location}</Typography>
                    <Typography gutterBottom>Joined: {props.user.joinDate}</Typography>
                    <Typography><PublicIcon/>www.alvnklein.com</Typography>
                    <Typography ><PinDropIcon/>Calgary, Canada</Typography>
                    <br/>
                </CardContent>
            </Card>
        </div>

    export default UserCard;