import React, {Component} from 'react';
import './components.css';
import FeedContainer from './FeedContainer';
import Footer from './Footer';
import Divider from '@material-ui/core/Divider';
import cookie from 'react-cookie';


// components 
import { HomeCard } from './UserCard';

class HomeContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: ''
        }
    }

    componentDidMount(){

        document.title = "SecondThoughts";

         // fetch profile info
         fetch('/0.0/users/lookup/'+cookie.load('userId'),{
             method:'GET',
             headers:{
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+cookie.load('token')
             }
         })
         .then(response=>response.json())
         .then((data)=>{
             console.log('success');
             console.log(data);
             this.setState({user:data});
         });

    }


    render(){

        return (
            <div className="homepage body">
                <Sidebar>
                    <HomeCard user={this.state.user}/>
                    <Divider /><br/>
                </Sidebar>

                <FeedContainer isHome={true} className="feed" />

                <Sidebar>
                    <div>
                        <div className="footer">
                            <li>© 2018 SecondThoughts</li>
                            <li><a href="/about" rel="noopener">About</a></li>
                        </div>
                    </div>
                </Sidebar>

            </div>
        );
    }
}

export default HomeContainer;



const Sidebar = (props) =>
    <div className="sidebar"> 
        {props.children}
    </div>


