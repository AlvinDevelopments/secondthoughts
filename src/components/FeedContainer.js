import React, {Component} from 'react';
import './components.css';
import PostContainer from './PostContainer';

import Divider from '@material-ui/core/Divider';

import cookie from 'react-cookie';

class FeedContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            isHome: this.props.isHome || false,
            userHandle : this.props.userHandle || window.location.pathname.split('/')[1],
            userId: this.props.userId || ''
        };
    }
    
    componentDidMount(){

        console.log(this.props);
        // fetch home if home prop is true
        if(this.props.isHome){
            fetch('/0.0/posts/home_timeline',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+cookie.load('token')
                }
            })
            .then(response => response.json())
            .then((data)=>{
                this.setState({posts:data.reverse()});
            });
        }
        else{

            console.log('looking up name');
            fetch('/0.0/posts/user_timeline?id='+this.state.userId,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then((data)=>{
                console.log(data);
                this.setState({posts:data.reverse()});
            });
                
            // fetch('/0.0/users/lookup_name/'+this.state.userHandle,{
            //     method: 'GET',
            //     headers:{
            //         'Content-Type': 'application/json'
            //     }
            // })
            // .then(response=>response.json())
            // .then((data) => {
            //     fetch('/0.0/posts/user_timeline?id='+data._id,{
            //         method: 'GET',
            //         headers:{
            //             'Content-Type': 'application/json',
            //         }
            //     })
            //     .then(response => response.json())
            //     .then((data)=>{
            //         console.log(data);
            //         this.setState({posts:data.reverse()});
            //     });

            // });
        
        }
    }

    render(){
        if(this.state.posts.length===0){
            return (
               <div className="feed" > No posts yet!</div>
            )
        }
        return (
           <FeedList posts={this.state.posts} />
        );
    }
}


const FeedList = (props) => 
    <div className="feed">
        {
            props.posts.map((post)=>
                <div key={post._id}>
                    <Divider light />
                    <PostContainer key={post._id} id={post._id}/>
                </div>
            )
        }    
    </div>

export default FeedContainer;