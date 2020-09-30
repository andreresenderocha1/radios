import React from 'react';
import {connect} from 'react-redux';
import {addAudio, initializeAudios} from '../../actions/RadiosAction';
import "my-customized-jinke-music-player/assets/index.css";
import {setAudioToPlay} from '../../actions/RadiosAction';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MyPlayer from './MyPlayer';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';

var _this;
class MySlider extends React.Component {  
    audioList1 =  [{    
        cover:
        require('../../assets/radios-logos/viny.png'),         
      },   
       ]    
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

          handleChange(event, newValue){
             MyPlayer.changeVolume(newValue)
             document.getElementById('volumeIconOff').style.display = 'none';
             document.getElementById('volumeIconOn').style.display = 'inline';
          }     

          handleMute(val){
             if(val){
                 document.getElementById('volumeIconOff').style.display = 'inline';
                 document.getElementById('volumeIconOn').style.display = 'none';
                 MyPlayer.changeVolume(0)
             }else {
                document.getElementById('volumeIconOff').style.display = 'none';
                document.getElementById('volumeIconOn').style.display = 'inline';
                MyPlayer.changeVolume(document.getElementById('volumeSlider').getElementsByTagName('input')[0].value)
                
             }
          }

    render(){
        return (
            <div class='casa' style={styles.containerSlider}>
                <VolumeUp id='volumeIconOn' onClick={()=>this.handleMute(true)} style={{marginRight:'10px', marginLeft: '3px',color: 'white', fontSize: '22px', cursor:'pointer'}} fontSize="big" />
                <VolumeOff id='volumeIconOff' onClick={()=>this.handleMute(false)} style={{display:'none', marginRight:'10px', marginLeft: '3px',color: 'white', fontSize: '22px', cursor:'pointer'}} fontSize="big" />
                <PrettoSlider id='volumeSlider' valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50} onChange={this.handleChange} />
            </div>   
        )    
    }
}

const styles = {
    containerSlider: {
        zIndex: '999999',
        width: '267px',
        position: 'relative',
        top: '739px',
        marginLeft: '7px',
        display: 'flex',
        alignItems: 'center'
    }
}

const PrettoSlider = withStyles({
    root: {
      color: '#b5b5b5',
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

export default connect(mapStateToProps,mapDispatchToProps)(MySlider)

