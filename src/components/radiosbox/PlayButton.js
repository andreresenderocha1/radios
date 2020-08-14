import React, {Component} from 'react';
import {Styl} from 'react-dom';
import {connect} from 'react-redux';
import {addAudio, initializeAudios, setAudioToPlay, setUrlToPlay, setPlayMusic} from '../../actions/RadiosAction';
import MyPlayer from './MyPlayer';

class PlayButton extends React.Component {
    

    constructor(props){
        super(props)
        this.state = {play: false, audio: null}
       
    }
    
    componentDidMount(){
        
       
    }
    
    stopAllAudios(){
        this.props.audios.map(audio=>{
            audio.pause()
        })
    }
      
    togglePlay = (ev) => {
        setTimeout(()=>console.log(this.props.audios),3000)
            if(this.props.audios.length>0){
                var founded = false;
                this.props.audios.map(audio=>{
                    if(ev.target.getAttribute('name')==audio.name){
                        founded = true
                    }
                })
                
                if(founded){
                    this.props.audios.map(audio=>{
                        if(audio.name == ev.target.getAttribute('name')){
                            if(this.props.radioPlaying && audio.name == this.props.radioPlaying.name){
                                this.stopAllAudios()
                                audio.pause()
                            }else{
                                this.stopAllAudios()
                                this.props.setAudioToPlay(audio)
                                this.props.setUrlToPlay(audio.url)
                                // setTimeout(()=>this.props.audioToPlay.play(),2000)
                            }
                            
                        }

                    })
                    

                }else{
                    var audio = new Audio(this.props.radio.url) 
                    audio.classList.add("music-player-audio")    
                    setTimeout(()=>console.log(audio),3000)       
                    audio.name = this.props.radio.name
                    this.setState({audio:audio})
                    this.stopAllAudios()
                    this.props.setAudioToPlay(audio)
                    this.props.setUrlToPlay(audio.url)
                    // setTimeout(()=>this.props.audioToPlay.play(),2000)
                    // this.props.audioToPlay.play()
                    this.setState({play:true})
                    this.props.addAudio(audio) 
                }
            }else{
                var audio = new Audio(this.props.radio.url)
                audio.classList.add("music-player-audio")   
                setTimeout(()=>console.log(audio),3000)        
                audio.name = this.props.radio.name
                this.setState({audio:audio})
                this.stopAllAudios()
                this.props.setAudioToPlay(audio)
                this.props.setUrlToPlay(audio.url)
                // setTimeout(()=>this.props.audioToPlay.play(),2000)
                this.setState({play:true})
                this.props.addAudio(audio)
            }
            console.log(audio)
    }

    func = ()=>{
        
    }


    render(){
        return (
          
                <a href="#" onClick={(ev)=>{this.togglePlay(ev);MyPlayer.playSong(this.props)}}>
                {this.props.children}
                
            </a>
          
            
            
        );
    }
}

const styles = {
    radiosContainer: {
        backgroundRepeat: 'round',
        width: 140,
        height: 140,
        marginRight: 10, 
        marginBottom: 10,    
        borderRadius: 8,
        boxShadow: '0px 1px 2px 1px rgba(0,0,0,.1)',
        backgroundSize: 'contain'
        
    }
}

const mapStateToProps = (state) => {
    return {
       
        audios: state.radiosReducer.audios,
        audioToPlay: state.radiosReducer.audioToPlay,
        radioPlaying: state.radiosReducer.radioPlaying
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

export default connect(mapStateToProps,mapDispatchToProps)(PlayButton)

