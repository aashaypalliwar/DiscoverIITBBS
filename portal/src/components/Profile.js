import React , {Component} from 'react'
import {Button } from 'react-bootstrap';
import axios from 'axios';
class Profile extends Component{
    state={
        email:" ",
        name:" ",
        bio:" "
    }

    componentDidMount(){
        this.setState({email:this.props.email,name : this.props.user});
    }
    getProfile = ()=>{
        axios.get('/v1/user/profile',{
            withCredentials:true
        }).then(response=>{
            console.log(response);
        }).catch(err=>console.log(err));
    }

    render(){
        return(
            <div>
                <h1>Hello   {this.state.name}</h1>
                <br></br>
                <Button
                variant="info"
                onClick = {this.getProfile}
              >
                Your Bio
              </Button>
                
            </div>
        )
    }

}

export default Profile