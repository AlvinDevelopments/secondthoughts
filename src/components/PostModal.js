import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import './components.css';

import cookie from 'react-cookie';

class PostModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            isOpen: props.isOpen,
            charCount: 0,
            color: 'black',
            tagMode:true,
            inProgress:false,
            currentTag:'',
            hashtags:[],
            tags: [],
            currentWord: '',
            wordArray: [],
        };
    }

    handleClose = (event) => {
        console.log('closing');
        this.props.onViewChange();
        this.setState({
            color: 'black',
            charCount: 0,
            text: ''
        });
    }

    componentWillReceiveProps(props){
        this.setState({isOpen:props.isOpen});
    }

    updatePostCount = (event) => {
        
        let wordArray = event.target.value.split(' ');
        let lastWord = wordArray[wordArray.length-1];
        let lastChar = !lastWord[lastWord.length-1]? ' ' : lastWord[lastWord.length-1];
        
        let tagArray = event.target.value.match(/[a-zA-Z]*\@[a-zA-Z]*/gi);
        let hashtagArray = event.target.value.replace(/xmas/i,' ').match(/[a-zA-Z]*\#[a-zA-Z]*/gi);

        this.setState({wordArray:wordArray});
        this.setState({text:event.target.value});
        this.setState({tags:tagArray, hashtags:hashtagArray});


        // switch(lastChar) {
        //     case ' ':
        //         if(this.state.inProgress){
        //             // this.setState(prevState => ({tags: [...prevState.tags,this.state.currentWord]}));
        //         }
        //     case '@':
        //         if(this.state.tagMode){
        //             if(this.state.inProgress){
        //                 // cancel current tag
        //             }
        //             else{
        //                 // start @
        //                 this.setState({inProgress:true});
        //             }
        //         }
        //         else{
        //             // start @
        //             this.setState({inProgress:true});

        //         }
        //     case '#':
        //         if(this.state.tagMode){
        //             if(this.state.inProgress){
        //                 // cancel current tag
        //             }
        //         }
        //         else{
        //             // start #
        //             this.setState({inProgress:true});
                    
        //         }
        //     default:
        //         // do nothing
        //         // this.setState({currentWord:lastWord});

        // }

        if(event.target.value.length>150){
            this.setState({color:'red'});
        }
        this.setState({charCount: event.target.value.length});
        // this.setState({text:event.target.value});
        
    }
    
    handlePost = (event) =>{
        console.log(this.state.text);
        // CODE TO SEND POST TO API
        var token = 'Bearer '+cookie.load('token');
        fetch('/0.0/posts/update',{
            method: 'POST',
            headers:{
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                "content":this.state.text
            })
        })
        this.props.onViewChange();
        this.setState({
            color: 'black',
            charCount: 0, 
            text: ''
        });
    }

    render(){

        let content = <p ref="InputField" contentEditable>
        {
            this.state.wordArray.map((item)=>
                (item.split('')[0]==='@') ? <span><b>{item}&nbsp;</b></span> : <span>{item}&nbsp;</span>
                // item
            )
        } 

        </p>

        
        return (
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.isOpen}
            onClose={this.handleClose}
            >
                <div className="modal-box">
                    <AccountCircle className="post-icon" />
                    <div className="border">
                        
                        <TextField
                            onChange={this.updatePostCount}
                            className="modal-post-input"
                            multiline={true}
                            rows={4}
                            placeholder="What's on your mind?"
                            id="bootstrap-input"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.text}
                            // value = {content}
                        />

                        {/* <div className="stylized-input">
                            {
                                this.state.wordArray.map((item)=>
                                    (item.split('')[0]==='@') ? <span><b>{item}&nbsp;</b></span> : <span>{item}&nbsp;</span>
                                )
                            }
                        </div> */}
                        {content}

                        
                        <div style={{color:this.state.color}}> 
                            Char Count: {this.state.charCount}/150
                        </div>
                        
                    </div>

                    <Button onClick={this.handlePost} color="primary">
                            Post
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                            Cancel
                    </Button>
                </div>
                
            </Modal>
        );
    }
}

export default PostModal;