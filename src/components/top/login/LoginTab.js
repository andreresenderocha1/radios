import React from 'react';
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import LoginButton from './LoginButton';
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
            senha: "",
            emailFail: false
        }     
        _this = this;
    }

    login(e){
        console.log('oi')
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(result => {
            console.log(result)
            this.props.cliquei();
            window.location.reload(false);

        }).catch(error => {
            console.log(error)
            this.setState({emailFail: true})
        })
    }

    signup(e){
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(result => {
            console.log(result)
        })
    }

    handleChange(e){
        console.log(this.state.email)
        console.log(this.state.password)
        if(this.state.emailFail){
            this.setState({emailFail: false})
        }
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
     
    render(){
        return (
            <div>   
                {this.state.emailFail? 
                <div style={{textAlign: 'center'}} >
                    <span style={{color: 'red', fontWeight:'bold'}}>Email ou senha invalidos!</span>
                </div>:null
                }
                
                <div style={styles.containerInputs}>
                    <Input style={{marginBottom: '5px'}} onChange={(e)=> this.handleChange(e)} name='email' iconPosition='left' placeholder='Email'>
                        <Icon name='user' />
                        <input />
                    </Input>
                    <Input iconPosition='left' type='password' onChange={(e)=> this.handleChange(e)} name='password' placeholder='Senha'>
                        <Icon name='lock' />
                        <input />
                    </Input>
                    <a href="#" style={styles.buttonLogin} onClick={(e)=>{this.login(e)}}>
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