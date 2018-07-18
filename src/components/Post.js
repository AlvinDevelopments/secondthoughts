import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

class Post extends Component {

    constructor(props){
        super(props);
        this.state = {
            post: 'wtf',
            postid: this.props.id,
            author: 'User',
            handle: '@MyUserHandle',
            time: '3:26 PM',
        };
    }

    componentDidMount(){
         // fetch post of post id
        fetch('/0.0/posts/show?id='+this.props.id,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(response=>response.json())
        .then((data)=>{
            this.setState({post:data.content, author:data.author, handle:'@'+data.author, time:data.postDate});
        });
    }

    render(){

        return (

            <div className="post">
            <a href="#"> <b>{this.state.author}</b></a> {this.state.handle} {this.state.time}
            <br/>
            <br/>
            <a> {this.state.post}</a>
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