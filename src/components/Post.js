import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

class Post extends Component {

    constructor(props){
        super(props);
        this.state = {
            post: this.props.avatar_url || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            postid: this.props.id,
            author: 'User',
            handle: '@MyUserHandle',
            time: '3:26 PM',
        };
    }

    componentDidMount(){
        // fetch post of post id
    }

    render(){

        return (

            <div className="post">
            <a href="#"> <b>{this.state.author}</b></a> {this.state.handle} {this.state.time}
            <br/>
            <br/>{this.state.postid}
            <br/>
            <img className="icon" src={this.state.post}/>
            <a href={this.state.post}> {this.state.post}</a>
            <br/>
            <br/>
            <IconButton>
                <MessageIcon/>
            </IconButton>
            <IconButton>
                <FavoriteIcon/>
            </IconButton>
            <IconButton>
                <ShareIcon/>
            </IconButton>
            </div>

        )
    }
}

export default Post;