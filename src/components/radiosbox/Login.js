import React, {Component} from 'react';
import {Styl} from 'react-dom';
import {connect} from 'react-redux';
import {addAudio, initializeAudios, setAudioToPlay, setUrlToPlay, setPlayMusic} from '../../actions/RadiosAction';
import MyPlayer from './MyPlayer';
import fire from '../../config';

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
    }

    login(e){
        e.preventDefault()
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(result => {
            console.log(result)
        })
    }

    signup(e){
        e.preventDefault()
        console.log(this.state.email)
        console.log(this.state.password)
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(result => {
            console.log(result)
        })
    }

    handleChange(e){
       
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    componentDidMount(){
    } 

    render(){
        return ( 
            <div>        
           
            <div style={styles.containerPopup}>
                <form>
                    <input type="email" id='email' name='email' placeholder='email' onChange={this.handleChange} value={this.state.email}/>
                    <input type="password" id='password' name='password' placeholder='password' onChange={this.handleChange} value={this.state.password}/>
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.signup}>Signup</button>

                </form>
            </div>
            </div>

        );
    }
}

const styles = {
    containerPopup: {
        width: '500px',
        height: '200px',
        backgroundColor: 'red',
        
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
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)

