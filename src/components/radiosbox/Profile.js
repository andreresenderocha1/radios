import React, {Component} from 'react';
import {Styl} from 'react-dom';
import {connect} from 'react-redux';
import {addAudio, initializeAudios, setAudioToPlay, setUrlToPlay, setPlayMusic, closeLoginPopup, setUser} from '../../actions/RadiosAction';
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
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

var _this;
class Profile extends React.Component { 

   
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
            
        }).catch((error)=>console.log( error))
    }
    
    changeBackground(e) {
        e.target.style.background = 'lightgray';
      }
      changeBack(e) {
        e.target.style.background = 'white';
      }

      logout(){
        firebase.auth().signOut().then(()=>{
            this.props.setUser(null);
            window.location.reload(false);
            this.props.cliquei();
        });
      }
    render(){
        return ( 

            
           <div style={{minWidth:'267px'}}>        
               <div style={{display:'flex'}}>
                    <Avatar style={{cursor:'pointer',marginRight:'30px',background:'white'}} alt="Remy Sharp" src={ this.props.user.photoURL || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'} />
                    <div style={{display:'flex',flexDirection:'column',justifyContent: 'center'}}>
                        <span style={{fontWeigth:'bold'}}>{this.props.user.displayName}</span>
                        <span>{this.props.user.email}</span>
                    </div>
                </div>
                <hr/>
                <div onClick={() => this.logout()} onMouseOver={this.changeBackground} onMouseLeave={this.changeBack} style={styles.itemProfile}>
                     <ExitToAppIcon style={{marginLeft:'15px'}} fontSize="big" />
                     <span style={{marginLeft:'10px'}}>Sair</span>
                </div>
               {/* <button onClick={()=>console.log(this.props.user)}></button> */}
                 
            </div>

        );
    }
}

const styles = {
    itemProfile: {
        cursor:'pointer',
        display: 'flex',
        paddingTop:'10px',
         paddingBottom:'10px',
         zIndex: '99999'
         
        
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
            urlToPlay: state.radiosReducer.urlToPlay,
            user: state.radiosReducer.user
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            initializeAudios: () => dispatch(initializeAudios()),
            addAudio: (audio) => dispatch(addAudio(audio)),
            setAudioToPlay: (audio) => dispatch(setAudioToPlay(audio)),
            setUrlToPlay: (url) => dispatch(setUrlToPlay(url)),
            setPlayMusic: (bol) => dispatch(setPlayMusic(bol)),
            closeLoginPopup: (bol) => dispatch(closeLoginPopup(bol)),
            setUser: (user) => dispatch(setUser(user))
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Profile)

