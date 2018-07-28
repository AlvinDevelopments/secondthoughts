import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import Post from './Post';



import cookie from 'react-cookie';
import {TextField, Divider } from '../../node_modules/@material-ui/core';

import {AccountCircle} from '@material-ui/icons';

import socketIOClient from 'socket.io-client'

class PostContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            content: '',
            postid: this.props.id,
            author: '',
            handle: '@',
            time: '',
            isFavorite: false,
            likeCount: 0,
            commentCount: 0,
            reply: '',
            isOpen: false,
            isPostOpen: false,
            type: '',
            anchorEl: null,
            isMenuOpen: false,
            isOwnPost: '',
            commentList: []
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
            // if(data.author!=)
            console.log(data);
            console.log(`author id is ${data.authorId}`);
            console.log(`cookie id is ${cookie.load('userId')}`);
            console.log(data.commentList);
            if(data.authorId===cookie.load('userId')){
                console.log('its a match!');
                this.setState({isOwnPost:true});
            }
            this.setState({content:data.content,
                author:data.author, 
                handle:'@'+data.author, 
                time:data.postDate, 
                likeCount:data.likeCount, 
                commentCount: data.commentCount, 
                type:data.type,
                commentList:data.commentList});
        });


        // checked favorited status
        fetch('/0.0/favorites/check/'+this.props.id,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+cookie.load('token')
            }
        })
        .then(response=>response.json())
        .then((data)=>{
            console.log(data);
            this.setState({isFavorite:data});
        });
    }

    handleFavorite = (event) => {
        const socket = socketIOClient('/');

        socket.emit('favorite createdd');


        var endpoint = this.state.isFavorite ? '/0.0/favorites/destroy/' : '/0.0/favorites/create/';
        console.log('endpoint is '+endpoint);

        fetch(endpoint+this.state.postid,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+cookie.load('token')
            }
        })
        .then(response=>response.json())
        .then((data)=>{
            console.log(`the result is ${data}`);
            this.setState((prevState => ({likeCount:prevState.likeCount+data})));
        });

        this.setState((prevState => ({isFavorite:!prevState.isFavorite})));

    }

    handleOpenReplyModal = (event) => {
        this.setState({isOpen:true});
    };

    handleOpenPostModal = (event) => {
        event.preventDefault();
        this.setState({isPostOpen:true});
    };

    handleReply = (event) => {
        event.preventDefault();
        console.log(event.target.content.value);
        // fetch comment
        fetch('/0.0/posts/reply/'+this.state.postid,{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+cookie.load('token')
            },
            body: JSON.stringify({
                content: event.target.content.value
            })
        })
        .then(response => {
            if(response.status===200){
                console.log('replied!!');
                return response.json();
            }
            else{
                console.log('reply failed...');
                return false;
            }
        });


        this.setState({isOpen:false});

    }

    handleRepost = (event) => {
        fetch('/0.0/posts/repost/'+this.state.postid,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+cookie.load('token')
            }
        });
    }

    handleClose = (event) => {
        this.setState({isOpen:false});
    }

    handlePostClose = (event) => {
        this.setState({isPostOpen:false});
    }

    handleMenu = (event) => {
        this.setState({anchorEl:event.currentTarget, isMenuOpen:true});
    }

    handleCloseMenu = (event) => {
        this.setState({isMenuOpen:false});
    }

    handleDelete = (event) => {
        fetch('/0.0/posts/destroy/'+this.state.postid,{
            method:'POST',
            headers:{
                'Authorization': 'Bearer '+cookie.load('token'),
            }
        })
        .then(response=>{
            if(response.status===200){
                return response.json();
            }
            else{
                console.log("ERROR!!!");
                return false;
            }
        })
        .then(data=>{
            // console.log(data.msg);
            this.setState((prevState)=>({commentList:[...prevState.commentList,data]}));
        });
    }



    render(){
        let repost = false;
        let status = this.state.type;
        // if(this.state.author!==window.location.pathname.split('/')[1]){
        //     repost = true;
        //     console.log('repost found');
        //     status = `retweet from ${this.state.author}`;
        // }

        let post = <Post
        isRepost = {repost}
        lol={status}
        author={this.state.author}
        handle={this.state.handle}
        time={this.state.time}
        commentCount={this.state.commentCount}
        likeCount={this.state.likeCount}
        content={this.state.content}
        isFavorite={this.state.isFavorite}
        onFavorite={this.handleFavorite}
        onComment={this.handleOpenReplyModal}
        onRepost={this.handleRepost}
        handleMenu={this.handleMenu}
        handleClose={this.handleClose}
        position={this.state.anchorEl}
        isOpen={this.state.isMenuOpen}
        handleCloseMenu={this.handleCloseMenu}
        isOwnPost={this.state.isOwnPost}
        handleDelete={this.handleDelete}
        handlePostOpen={this.handleOpenPostModal}
        />

        return (
            <div>
                <ReplyModal 
                post={post} 
                author={this.state.author} 
                open={this.state.isOpen} 
                handleClose={this.handleClose} 
                handleReply={this.handleReply}
                />

                <FullPostModal 
                post={post} 
                author={this.state.author} 
                open={this.state.isPostOpen} 
                handleClose={this.handlePostClose}
                commentList={this.state.commentList}
                />

                {post}
            </div>
            
        )
    }
}

export default PostContainer;



const ReplyModal = (props) => 
[
    <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={props.open}
    onClose={props.handleClose}
    >
        <div className="modal-box">
            <AccountCircle className="post-icon" />
            <h2>Reply to {props.author} </h2>
            {props.post}
            <div className="border">
            <form onSubmit={props.handleReply}>
                <TextField
                    name="content"
                    onChange={this.updatePostCount}
                    className="modal-reply-input"
                    multiline={true}
                    rows={4}
                    placeholder={`Replying to @${props.author}`}
                    id="bootstrap-input"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" color="primary">
                    Post
                </Button>
                <Button onClick={props.handleClose} color="primary">
                        Cancel
                </Button>
            </form>
                <div style={{color:props.color}}> 
                    Char Count: {props.charCount}/150
                </div>
            </div>

            
        </div>
    </Modal>
]


const FullPostModal = (props) => 
[
    <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={props.open}
    onClose={props.handleClose}
    >
        <div className="modal-box">
            <AccountCircle className="post-icon" />
            <h2>Post by {props.author} </h2>
            {props.post}
            <div className="border">
            <form onSubmit={props.handleReply}>
                <TextField
                    name="content"
                    onChange={this.updatePostCount}
                    className="modal-reply-input"
                    multiline={true}
                    rows={4}
                    placeholder={`Replying to @${props.author}`}
                    id="bootstrap-input"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" color="primary">
                    Post
                </Button>
                <Button onClick={props.handleClose} color="primary">
                        Cancel
                </Button>
            </form>
                {/* <div style={{color:props.color}}> 
                    Char Count: {props.charCount}/150
                </div> */}
            </div>

            <Divider/>
            {
                props.commentList.map((comment)=>
                    <div>
                        <PostContainer id={comment} />
                        {/* {comment} */}
                    </div>
                )
            }

            
        </div>
    </Modal>
]