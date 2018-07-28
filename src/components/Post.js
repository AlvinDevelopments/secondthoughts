import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Divider, Menu, MenuList, MenuItem } from '../../node_modules/@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';


const Post = (props) => 

<div className="post">
    {/* <Divider/> */}
    <h3 style={{'display':'inline'}}><a href={'/'+props.author}> <b>{props.author}</b></a> </h3>{props.handle} <a href="#" onClick={props.handlePostOpen}>{props.time}</a> 
    <IconButton className="post-menu-button">
        <MoreVertIcon onClick={props.handleMenu}/>
    </IconButton>
    <PostMenu isOwnPost={props.isOwnPost} position={props.position} isOpen={props.isOpen} handleClose={props.handleCloseMenu} handleDelete={props.handleDelete} />
    {/* <div><b>{props.lol}</b></div> */}
    <br/>
    <h2>
        {/* {props.content.split(' ')[0]} */}
        {
            props.content.split(' ').map(word=>
                (word.split('')[0]===('@'))? <span><a href={"/"+word.split('@')[1]}>{word}</a> </span> : 
                (word.split('')[0]===('#'))? <span><a href={"/hashtag/"+word.split('#')[1]}>{word}</a> </span> : <span>{word} </span>
                
            )
        }
    </h2>
    {/* <br/> */}
    {/* <Divider/> */}
    <IconButton onClick={props.onComment}>
        <MessageIcon/>
    </IconButton>
    {props.commentCount}
    <IconButton>
        <FavoriteIcon style={{'color': props.isFavorite && 'red'}} onClick={props.onFavorite}/>
    </IconButton>
    {props.likeCount}
    <IconButton style={{'color': props.isRepost && 'green'}} onClick={props.onRepost}>
        <ShareIcon/>
    </IconButton>
</div>


const PostMenu = (props) =>
    <Menu
    open={props.isOpen}
    anchorEl={props.position}
    onClose={props.handleClose}
    >
        {props.isOwnPost && <MenuItem onClick={props.handleDelete} >Delete</MenuItem>}
        {props.isOwnPost &&<MenuItem>Item 2</MenuItem>}
        <MenuItem>Item 3</MenuItem>
    </Menu>


export default Post;