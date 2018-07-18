import React, {Component} from 'react';
import './components.css';
import Feed from './Feed';
import ProfileCard from './ProfileCard';
import Footer from './Footer';
import Divider from '@material-ui/core/Divider';



function Sidebar(props){
    return (
        <div className="sidebar"> 
            {props.children}
        </div>
    );

}

class Home extends Component {

    constructor(props){
        super(props);

        this.state = props;
    }

    componentDidMount(){
    }


    render(){

        return (
            <div className="homepage">
                <Sidebar>
                    <ProfileCard />
                    <Divider /><br/>
                    <Footer/>
                </Sidebar>
                <Feed className="feed" />
                <Sidebar>
                    <Footer/>
                </Sidebar>
            </div>
        );
    }
}

export default Home;