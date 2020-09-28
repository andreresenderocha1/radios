import React from 'react';
import {connect} from 'react-redux';
import {addAudio, initializeAudios} from '../../actions/RadiosAction';
import ReactJkMusicPlayer from 'my-customized-jinke-music-player';
import "my-customized-jinke-music-player/assets/index.css";
import {setAudioToPlay} from '../../actions/RadiosAction';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

var _this;
class MyPlayer extends React.Component {  

    audioList1 =  [{    
        cover:
        require('../../assets/radios-logos/viny.png'),         
      },   
       ]    
         options = {
            audioInfo: {name: 'andre'},
            audioLists: this.audioList1,   
            defaultPlayIndex: 0,   
            theme: 'dark',    
            bounds: 'body',
            autoPlayInitLoadPlayList: false,  
            preload: false,  
            glassBg: true,  
            remember: false,  
            remove: false,  
            defaultPosition: {
              right: 100,
              bottom: 120,
            },
            defaultPlayMode: 'order',
            mode: 'full',
            once: false,
            autoPlay: false,
            toggleMode: false,
            showMiniModeCover: false,
            showMiniProcessBar: false,
            drag: false,
            seeked: false,  
            showMediaSession: false,  
            showProgressLoadBar: false,  
            showPlay: false,  
            showReload: true,  
            showDownload: false,  
            showPlayMode: false,  
            showThemeSwitch: false,  
            showLyric: true,  
            showDestroy: true,  
            extendsContent: null,  
            defaultVolume: 4,  
            playModeShowTime: 600,  
            loadAudioErrorPlayNext: false,  
            autoHiddenCover: false,  
            spaceBar: true,
            responsive: true,
          
            onAudioPlayTrackChange(currentPlayId, audioLists, audioInfo) {
                document.getElementsByClassName('current-time')[0].style.display = 'none';
                var audios = document.getElementsByTagName('audio');
                if(document.getElementsByName(audioInfo.name)[0]){
                    document.getElementsByName(audioInfo.name)[0].parentNode.firstChild.style.display = 'none';
                }
            _this.audio.pause()
            },

            onAudioPause(audioInfo) {
                document.getElementsByName(audioInfo.name)[0].parentNode.firstChild.style.display = 'none';
            },

            onAudioPlay(audioInfo) {            
                if(document.getElementsByName(audioInfo.name)[0]){
                    document.getElementsByName(audioInfo.name)[0].parentNode.firstChild.style.display = 'inline';
                    document.getElementsByClassName('current-time')[0].style.display = 'inline';
                    
                }
            },
            
          }

          constructor(props) {
            super(props)
            this.audio = {}
            _this = this;
          }

          state = {
            unmount: false,
            params: {
              ...this.options,
              getAudioInstance: (audio) => {
                this.audio = audio
              },
            },
          }

          static changeVolume(newValue){
              _this.audio.volume = (newValue/100)
          }
      

      static getAudio(name){
          if(!_this.state.params.audioLists){
            _this.audio.clear()
            _this.setState({
                params: {
                  ..._this.options,                       
                  audioLists: [
                    {
                      name: _this.props.radioPlaying ? _this.props.radioPlaying.name : 'stop',
                      singer: 'Brasilia',
                      cover:
                      require('../../assets/radios-logos/' + _this.props.radioPlaying.name + '.jpg'),
                        musicSrc:
                        _this.props.radioPlaying ?_this.props.radioPlaying.url : 'no', 
                    },   
                  ],
                }
            },()=>{_this.audio.play()})
          }else{
           
            var founded = false;
            var i;
            var igual = false;
            _this.state.params.audioLists.forEach((radio,index)=>{
                if(_this.props.radioPlaying && radio.name == _this.props.radioPlaying.name){                       
                    founded = true;
                    i = index;
                }else if(!_this.props.radioPlaying){
                    if(radio.name == name){
                        founded = true;
                        i = index;
                        igual = true
                    }
                }
                
            })
            if(!founded){
                _this.setState({
                    params: {
                    ..._this.options,  
                        
                    
                    audioLists: [..._this.state.params.audioLists,
                        {
                        name: _this.props.radioPlaying ? _this.props.radioPlaying.name : 'stop',
                        singer: 'Brasilia',
                        cover:
                        require('../../assets/radios-logos/' + _this.props.radioPlaying.name + '.jpg'),
                            musicSrc:
                            _this.props.radioPlaying ?_this.props.radioPlaying.url : 'no', 
                        },   
                    ],
                    }
                },()=>{
                    var a;
                _this.state.params.audioLists.forEach((radio,index)=>{
                        if(radio.name == _this.props.radioPlaying.name){                       
                            a = index;
                        }
                    
                    })
                    
                    _this.audio.playByIndex(a)
                })
            }else {
                console.log(i)
                igual ? _this.audio.play() : _this.audio.playByIndex(i)
                
            }
          }     
      }


      static stopSong(){
        _this.audio.pause()
      }

  
      componentDidUpdate(prevProps, prevState){      
        if(prevProps.audioToPlay.name !== this.props.audioToPlay.name ){            
             MyPlayer.getAudio()
        }
     }

     static stopAudio(){
         _this.audio.pause()
     }

    render(){
        return (
            <div>         
              <ReactJkMusicPlayer 
                {..._this.state.params}
              />  
            </div>            
        )    
    }
}

const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const mapStateToProps = (state) => {
    return {       
        audios: state.radiosReducer.audios,
        audioToPlay: state.radiosReducer.audioToPlay,
        radioPlaying: state.radiosReducer.radioPlaying,
        urlToPlay: state.radiosReducer.urlToPlay,
        playMusic: state.radiosReducer.playMusic
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initializeAudios: () => dispatch(initializeAudios()),
        addAudio: (audio) => dispatch(addAudio(audio)),
        setAudioToPlay: (audio) => dispatch(setAudioToPlay(audio)),        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyPlayer)

