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
        // fetch user data

         // fetch profile info
         var token = 'Bearer '+cookie.load('token');

         fetch('/0.0/users/lookup/'+cookie.load('userId'),{
             method:'GET',
             headers:{
                 'Content-Type': 'application/json',
                 'Authorization': token
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
                            <li><a href="//support.twitter.com" rel="noopener">Help Center</a></li>
                            <li><a href="/tos" rel="noopener">Terms</a></li>
                            <li><a href="/privacy" rel="noopener">Privacy policy</a></li>
                            <li><a href="//support.twitter.com/articles/20170514" rel="noopener">Cookies</a></li>
                            <li><a href="//support.twitter.com/articles/20170451" rel="noopener">Ads info</a></li>
                            <li><a href="//about.twitter.com/press/brand-assets" rel="noopener">Brand</a></li>
                            <li><a href="https://blog.twitter.com" rel="noopener">Blog</a></li>
                            <li><a href="http://status.twitter.com" rel="noopener">Status</a></li>
                            <li><a href="https://about.twitter.com/products" rel="noopener">Apps</a></li>
                            <li><a href="https://about.twitter.com/careers" rel="noopener">Jobs</a></li>
                            <li><a href="https://marketing.twitter.com" rel="noopener">Marketing</a></li>
                            <li><a href="https://business.twitter.com" rel="noopener">Businesses</a></li>
                            <li><a href="//dev.twitter.com" rel="noopener">Developers</a></li>
                        </div>
                    </div>
                    {/* <UserCard user={this.state.user}/> */}
                    {/* <Divider /><br/> */}
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


