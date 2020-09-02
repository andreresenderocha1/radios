import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import LoginButton from './LoginButton';
import InputUsuario from './InputUsuario';
import InputSenha from './InputSenha';
import firebase from 'firebase';
import { Icon, Input } from 'semantic-ui-react'




var _this;
class LoginTab extends React.Component {
    constructor(props){
        super(props)  
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
        this.state = {
            email: "",
            password: ""
        }     
        _this = this;

    }

    login(e){
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(result => {
            console.log(result)
        })
    }

    signup(e){
        e.preventDefault()
        console.log(this.state.email)
        console.log(this.state.password)
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(result => {
            console.log(result)
        })
    }

    handleChange(e){
       
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    googleLogin(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result)=>{
            window.location.reload(false);
        }).catch((error)=>console.log( error))
    }

    facebookLogin(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result)=>{
            window.location.reload(false);

        }).catch((error)=>console.log( error))
    }
    
    componentDidMount(){
    } 
  
    render(){
  return (
    <div>        
            
             <hr style={styles.linha}/>
             

             <div style={styles.containerInputs}>
                <Input iconPosition='left' placeholder='Email'>
                    <Icon name='user' />
                    <input />
                </Input>
                <Input iconPosition='left' placeholder='Senha'>
                    <Icon name='lock' />
                    <input />
                </Input>
                 <a href="#" style={styles.buttonLogin} onClick={this.login}>
                     <LoginButton title='Login' />
                 </a>
                 <a href="#" style={{textAlign:'right'}}>
                     esqueceu a senha?
                 </a>
             </div>
             <div style={{display:'flex',alignItems: 'center', width: '100%'}}>
                <hr style={styles.meiaLinha}/> <span>ou</span> <hr style={styles.meiaLinha}/>   
             </div>
             <div style={styles.containerButtons}>
                <a href="#" style={{textDecoration: 'none', width: '100%'}} onClick={()=>{this.props.cliquei();this.facebookLogin()}}>
                    <FacebookButton />
                 </a>
                 <a href="#" style={{textDecoration: 'none', width: '100%'}} onClick={()=>{this.props.cliquei();this.googleLogin()}}>
                     <GoogleButton />
                 </a>
             </div>
         </div>
  );
    }
}


const styles = {
    linha: {
        width: '256px', 
        borderTop: '1px solid #cecece',
        borderBottom: 'none',
        borderRight: 'none',
        borderLeft: 'none',        
    },
    meiaLinha: {
        width: '100px', 
        borderTop: '1px solid #cecece',
        borderBottom: 'none',
        borderRight: 'none',
        borderLeft: 'none',        
    },
    buttonLogin: {
        textDecoration: 'none',
        
    },
    containerPopup: {
        width: '500px',
        height: '400px',
        backgroundColor: 'lightgoldenrodyellow',
        zIndex: 9999,
        position: 'absolute',
        right: '20px',
        top: '100px',
        borderRadius: '10px'        
    },
    txtLogin: {
        textAlign: 'center'
    },
    containerButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px'
    },
    containerInputs: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-around',
        padding: '38px'
    }
    
}

export default LoginTab;