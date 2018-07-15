import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){

        return(
            <div>
                <Card>
                    <CardContent>
                        <a>© 2018 SecondThoughts </a> 
                        <a>About </a> 
                        <a>Help Center </a> 
                        <a>Terms </a> 
                        <a>Privacy policy </a>  
                        <a>Cookies </a> 
                        <a>Ads info </a> 
                        <a>Brand </a> 
                        <a>Blog </a> 
                        <a>Status </a>    
                        <a>Apps </a>
                        <a>Jobs </a>
                        <a>Marketing </a>
                        <a>Businesses </a>
                        <a>Developers </a>
                    </CardContent>
                    <Divider/>
                    <CardContent>
                        Advertise with SecondThoughts
                    </CardContent>
                    
                </Card>
            </div>
        )
    }
}

export default Footer;