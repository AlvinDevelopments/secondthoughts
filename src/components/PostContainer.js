import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import Post from './Post';


import { ReplyModal, PostMenu} from './Post';
// import



import cookie from 'react-cookie';
import {TextField, Divider } from '../../node_modules/@material-ui/core';

import {AccountCircle} from '@material-ui/icons';

import socketIOClient from 'socket.io-client'

class PostContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            isReplyModalOpen: false,
            isPostModalOpen: false,
            isMenuOpen: false,
            anchorEl: null,
            isOwnPost: '',
            
            
            postid: this.props.id,
            reply: '',
            post: {
                content: '',
                type: '',
                parent:'',
                author: '',
                authorId:'',
                handle: '@',
                time: '',
                isFavorite: false,
                likeCount: 0,
                commentCount: 0,
                commentList: [],
            }
        };
    }

    componentDidMount(){
         // fetch post of post id
        fetch('/0.0/posts/show?id='+this.props.id,{
            method:'GET',
        })
        .then(response=>response.json())
        .then((data)=>{
            if(data.authorId===cookie.load('userId')){
                this.setState({isOwnPost:true});
            }
            // console.log(data);
            this.setState({post:data});
        });

        // checked favorited status
        fetch('/0.0/favorites/check/'+this.props.id,{
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+cookie.load('token')
            }
        })
        .then(response=>response.json())
        .then((data)=>{
            // console.log(data);
            this.setState({isFavorite:data});
        });
    }

    handleFavorite = (event) => {
        const socket = socketIOClient('/');
        socket.emit('favorite created',this.state.authorId);
        // socket.disconnect();

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

    handleOpenFullPost = (event) =>{
        
    }

    handleToggleReplyModal = (event) => {
        event.preventDefault();
        this.setState((prevState)=>({isReplyModalOpen:!prevState.isReplyModalOpen}));
        console.log('toggle reply modal');
    }

    handleToggleRepostModal = (event) => {
        event.preventDefault();
        // TODO
    }

    handleTogglePostModal = (event) => {
        event.preventDefault();
        this.setState((prevState)=>({isPostModalOpen:!prevState.isPostModalOpen}));
    }

    handleToggleMenu = (event,position) => {
        event.preventDefault();
        console.log(position);
        if(this.state.isMenuOpen){
            this.setState((prevState)=>({anchorEl:null, isMenuOpen:!prevState.isMenuOpen}));
        }
        else{
            this.setState((prevState)=>({anchorEl:position, isMenuOpen:!prevState.isMenuOpen}));

        }
        console.log(this.state.anchorEl);
    }


    render(){

        let post = <Post
        // core props
        post={this.state.post}
        isOwnPost={this.state.isOwnPost}

        // api action props
        onFavorite={this.handleFavorite}
        onRepost={this.handleRepost}
        onReply={this.handleReply}
        onDelete={this.handleDelete}
        
        // view props
        isFavorite={this.state.isFavorite}

        // view toggle
        onTogglePostModal={this.handleTogglePostModal}
        onToggleMenu={(e,position)=>this.handleToggleMenu(e,position)}
        onToggleReplyModal={this.handleToggleReplyModal}
        onToggleRepostModal={this.handleToggleRepostModal}
        
        />


        return (
            <div>
                <ReplyModal 
                post={post}
                author={this.state.post.author} 
                isOpen={this.state.isReplyModalOpen} 
                onToggleReplyModal={this.handleToggleReplyModal} 
                onSubmitReply={this.handleReply}
                />

                <PostMenu isOwnPost={this.state.isOwnPost} 
                position={this.state.anchorEl} 
                isOpen={this.state.isMenuOpen} 
                onDelete={this.handleDelete}
                onToggleMenu={(e,position)=>this.handleToggleMenu(e,position)}
                />

                <FullPostModal
                post={post}
                author={this.state.post.author}
                isPostModalOpen={this.state.isPostModalOpen}
                onTogglePostModal={this.handleTogglePostModal}
                commentList={this.state.post.commentList}
                />

                {post}
            </div>
            
        )
    }
}

export default PostContainer;


const FullPostModal = (props) => 
[
    <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={props.isPostModalOpen}
    onClose={props.onTogglePostModal}
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
                <Button onClick={props.onTogglePostModal} color="primary">
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