import React, {Component} from 'react';
import {Styl} from 'react-dom';
import {connect} from 'react-redux';
import {addAudio, initializeAudios, setAudioToPlay, setUrlToPlay, setPlayMusic, closeLoginPopup} from '../../actions/RadiosAction';
import MyPlayer from './MyPlayer';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import LoginButton from './LoginButton';
import InputUsuario from './InputUsuario';
import InputSenha from './InputSenha';
import 'semantic-ui-css/semantic.min.css'
import { Button, Popup } from 'semantic-ui-react'

var _this;
class Login extends React.Component { 

   
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
            console.log('oii')
            console.log(result)
            console.log(firebase.auth().currentUser.displayName)
            window.location.reload(false);
        }).catch((error)=>console.log( error))
    }

    facebookLogin(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result)=>{
            console.log(result)
        }).catch((error)=>console.log( error))
    }
    
    componentDidMount(){
    } 

    render(){
        return ( 

            
           <div>        
                <h1 style={styles.txtLogin}>Login</h1>
                <hr/>
                <div style={styles.containerButtons}>
                    <a href="#" style={{textDecoration: 'none'}} onClick={()=>{this.props.cliquei();this.facebookLogin()}}>
                        <FacebookButton />
                    </a>
                    <a href="#" style={{textDecoration: 'none'}} onClick={()=>{this.props.cliquei();this.googleLogin()}}>
                        <GoogleButton />
                    </a>
                </div>

                <div style={styles.containerInputs}>
                    <InputUsuario />
                    <InputSenha />
                </div>    
                <div>
                    <a href="#" style={{textDecoration: 'none'}} onClick={this.login}>
                        <LoginButton />
                    </a>
                </div>
                <hr/>
               
                    {/* <button onClick={this.googleLogin}>google</button> */}
                    {/* <button onClick={this.facebookLogin}>facebook</button> */}

                    {/* <input type="email" id='email' name='email' placeholder='email' onChange={this.handleChange} value={this.state.email}/>
                    <input type="password" id='password' name='password' placeholder='password' onChange={this.handleChange} value={this.state.password}/> */}

                    {/* <button onClick={this.login}>Login</button> */}
                    {/* <button onClick={this.signup}>Signup</button>
                    <button onClick={()=>{firebase.auth().signOut();this.forceUpdate()}}>out</button> */}

            </div>

        );
    }
}

const styles = {
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
        justifyContent: 'space-around'
    },
    containerInputs: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-around'
    }
    
}

    const mapStateToProps = (state) => {
        return {
        
            audios: state.radiosReducer.audios,
            audioToPlay: state.radiosReducer.audioToPlay,
            radioPlaying: state.radiosReducer.radioPlaying,
            radios: state.radiosReducer.radios,
            urlToPlay: state.radiosReducer.urlToPlay
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            initializeAudios: () => dispatch(initializeAudios()),
            addAudio: (audio) => dispatch(addAudio(audio)),
            setAudioToPlay: (audio) => dispatch(setAudioToPlay(audio)),
            setUrlToPlay: (url) => dispatch(setUrlToPlay(url)),
            setPlayMusic: (bol) => dispatch(setPlayMusic(bol)),
            closeLoginPopup: (bol) => dispatch(closeLoginPopup(bol))
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Login)

