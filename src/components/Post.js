import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Divider, Menu, MenuList, MenuItem, Modal, TextField, Button } from '../../node_modules/@material-ui/core';

import {AccountCircle} from '@material-ui/icons';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const Post = (props) => 

<div className="post">
    <h3 style={{'display':'inline'}}><a href={'/'+props.post.author}> <b>{props.post.author}</b></a> </h3>{props.post.handle} <a href="#" onClick={props.onTogglePostModal}>{props.post.postDate}</a> 
    <IconButton className="post-menu-button">
        <MoreVertIcon onClick={(e)=>props.onToggleMenu(e,e.currentTarget)}/>
    </IconButton>
    <br/>
    <h2>
        {
            props.post.content.split(' ').map(word=>
                (word.split('')[0]===('@'))? <span><a href={"/"+word.split('@')[1]}>{word}</a> </span> : 
                (word.split('')[0]===('#'))? <span><a href={"/hashtag/"+word.split('#')[1]}>{word}</a> </span> : <span>{word} </span>
                
            )
        }
    </h2>
    <IconButton onClick={props.onToggleReplyModal}>
        <MessageIcon/>
    </IconButton>
    {props.post.commentCount}
    <IconButton>
        <FavoriteIcon style={{'color': props.isFavorite && 'red'}} onClick={props.onFavorite}/>
    </IconButton>
    {props.post.likeCount}
    <IconButton style={{'color': props.isRepost && 'green'}} onClick={props.onRepost}>
        <ShareIcon/>
    </IconButton>
</div>


export const ReplyModal = (props) => 
[
    <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={props.isOpen}
    onClose={props.onToggleReplyModal}
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
                <Button onClick={props.onToggleReplyModal} color="primary">
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


export const PostMenu = (props) =>
    <Menu
    open={props.isOpen}
    anchorEl={props.position}
    onClose={props.onToggleMenu}
    >
        {props.isOwnPost && <MenuItem onClick={props.handleDelete} >Delete</MenuItem>}
        {props.isOwnPost &&<MenuItem>Item 2</MenuItem>}
        <MenuItem>Item 3</MenuItem>
    </Menu>






export default Post;