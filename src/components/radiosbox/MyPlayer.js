import React, {Component} from 'react';
import {Styl} from 'react-dom';
import {connect} from 'react-redux';
import {addAudio, initializeAudios} from '../../actions/RadiosAction';
import ReactJkMusicPlayer from 'my-customized-jinke-music-player';
import "my-customized-jinke-music-player/assets/index.css";
import {setAudioToPlay} from '../../actions/RadiosAction';

var _this;
class MyPlayer extends React.Component {  

        
        
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
            showThemeSwitch: true,  
            showLyric: true,  
            showDestroy: true,  
            extendsContent: null,  
            defaultVolume: 1,  
            playModeShowTime: 600,  
            loadAudioErrorPlayNext: true,  
            autoHiddenCover: false,  
            spaceBar: true,
            responsive: true,
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
        
          
      

      static getAudio(){
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
                        'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
                        musicSrc:
                        _this.props.radioPlaying ?_this.props.radioPlaying.url : 'no', 
                    },   
                  ],
                }
            },()=>{_this.audio.play()})
          }else{
            const audioLists2= [
                {
                name:_this.props.radioPlaying ? _this.props.radioPlaying.name : 'stop',
                singer: 'Brasilia',
                cover:
                    'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
                    musicSrc:
                    _this.props.radioPlaying ?_this.props.radioPlaying.url : 'no', 
                },   
            ]

            _this.audio.appendAudio(1, audioLists2)
            _this.audio.playNext()
          }
        
          

        
       
          
      }
      static stopSong(){
        _this.audio.pause()
    }

      static playSong(props) {
        _this.setState({
            params: {
              ..._this.options,  
                 
              audioLists: [
                {
                  name: _this.props.radioPlaying.name,
                  singer: 'Brasilia',
                  cover:
                    'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
                    musicSrc:
                    _this.props.radioPlaying.url, 
                },   
              ],
            }
        },()=>{
            // getAudioInstance: (audio) => {
            //     this.setState({audio : audio},()=> _this.state.audio.play())
            //   }      
            this.state = {
                params: {
                  ..._this.options,
                 
                  getAudioInstance: (audio) => {
                    _this.setState({audio : audio},()=>_this.state.audio.play())
                  },
                }
            }
            
        }
            
        
          )
      }
    render(){
        return (
            <>
            <div style={{width:400,height:400}}>
              <ReactJkMusicPlayer 
                {..._this.state.params}
                
                playIndex={0}
              />
              <button onClick={()=>this.audio.play()}>click</button>
                </div>
            </>
            
        )    
    }
}

const styles = {
    
}

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

