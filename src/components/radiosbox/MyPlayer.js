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
        console.log(_this.props.radioPlaying);
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
                      require('./images/' + _this.props.radioPlaying.name + '.png'),
                        musicSrc:
                        _this.props.radioPlaying ?_this.props.radioPlaying.url : 'no', 
                    },   
                  ],
                }
            },()=>{_this.audio.play()})
          }else{
           
            var founded = false;
            var i;
            _this.state.params.audioLists.forEach((radio,index)=>{
                if(radio.name == _this.props.radioPlaying.name){                       
                    founded = true;
                    i = index;
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
                        require('./images/' + _this.props.radioPlaying.name + '.png'),
                            musicSrc:
                            _this.props.radioPlaying ?_this.props.radioPlaying.url : 'no', 
                        },   
                    ],
                    }
                },()=>{
                    var a;
                _this.state.params.audioLists.forEach((radio,index)=>{
                    debugger
                        if(radio.name == _this.props.radioPlaying.name){                       
                            a = index;
                        }
                    
                    })
                    _this.audio.playByIndex(a)
                })
            }else {
                _this.audio.playByIndex(i)
            }


            // _this.audio.appendAudio(1, audioList2)
            console.log(_this.audio)
            // setTimeout(()=> _this.audio.playNext(),5000)
            // _this.audio.clear()
            // _this.audio.playNext()
          }     

      }


      static stopSong(){
        _this.audio.pause()
      }

  
      componentDidUpdate(prevProps, prevState){
         console.log(prevProps)
         console.log(this.props)
        if(prevProps.audioToPlay.name !== this.props.audioToPlay.name ){
             MyPlayer.getAudio()
        }

       

        

        
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

