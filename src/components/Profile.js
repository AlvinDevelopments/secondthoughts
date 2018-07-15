import React, {Component} from 'react';

import Feed from './Feed';
import cookie from 'react-cookie';
import {withRouter} from 'react-router-dom';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile: null,
            posts: []
        };
    }

    componentDidMount(){

        var screenName = this.props.location.pathname.split('/')[1];
        var id = '';

        // GET ID
        
        fetch('/0.0/users/lookup_name/'+screenName,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response=>response.json())
        .then((data) => {
            id = data._id;
            console.log(data);
            console.log(id);



            // FETCH PROFILE OBJECT FROM API
            var token = 'Bearer '+cookie.load('token');
            console.log(this.props.location.pathname.split('/')[1]);

            fetch('/0.0/posts/user_timeline?screen_name='+id,{
                method: 'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': token
                }
            })
            .then(function(response){
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({posts:data});
            });
        })
        .catch(function(){
            console.log("error");
        });



        

    }

    render(){

        return(
            <div>
                Profile page for {this.props.location.pathname.split('/')[1]}
                {
                    this.state.posts.map((item)=>
                        <div key={item._id}>
                            {item.content}
                        </div>
                    )
                }
            </div>
        )
    }
}

export default withRouter(Profile);