import React from 'react';
import {connect} from 'react-redux';
import {addAudio, initializeAudios, setAudioToPlay, setUrlToPlay, setPlayMusic, closeLoginPopup} from '../../../actions/RadiosAction';
import firebase from 'firebase';
import 'semantic-ui-css/semantic.min.css'
import TabLogin from './TabLogin'


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

    render(){
        return ( 
            <div>
              <div style={{width:'100%', height:'50px', background:'lightgray'}}>
            </div>
            <TabLogin cliquei={()=>this.props.cliquei()}/>                
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

