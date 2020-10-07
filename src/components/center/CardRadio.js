import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { red } from '@material-ui/core/colors';
import PlayButton from './PlayButton';
import FavoritoIcon from './FavoritoIcon';
import wavegif from '../../assets/wave.gif';
import {connect} from 'react-redux';
import {setRadioPlaying} from '../../actions/RadiosAction';
import ReactLoading from 'react-loading';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 195,
    height: 156,
    margin: 10,
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
  },
  media: {
    height: 0,
    
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  displayTrue: {
    display: 'inline'
},
displayFalse: {
    display: 'none'
}
  
}));

const styles = {
    root: {
        width: 195,
        height: 156,
        margin: 14,
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        position: 'relative'
      },
      media: {
        height: 0,
        
        paddingTop: '56.25%', // 16:9
      },

    largeIcon: {
      marginRight: 20
    },
    actionsButtons: {
        height: 30
    },
    contentCard: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignItems: 'center'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20
    },
    name: {
        fontSize: 16,
        fontFamily: "'Josefin Sans', cursive",
        fontWeigh: '300',
        marginBottom: '-4px'
    },
    local: {
        fontSize: 14,
        fontFamily: "'Josefin Sans', cursive",
        color: 'gray'
    },
    wave: {
        width: 192,
        height: 113,
        position: 'absolute',
        opacity: 0.5,
     
    },
    displayTrue: {
        width: 192,
        height: 113,
        position: 'absolute',
        opacity: 0.5,
        display: 'inline'
    },
    displayFalse: {
        width: 192,
        height: 113,
        position: 'absolute',
        opacity: 0.5,
        display: 'none'
    }
   
  
  };  
  

var _this;
class CardRadio extends React.Component {      
    constructor(props) {
        super(props);  
        this.state = {
            loading: ''
        }  
        _this = this;
      } 

       isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    
      componentDidMount(){
         var spinners = document.getElementsByClassName('spinner')
         Array.prototype.forEach.call(spinners, function(item) {  
            item.style.display = 'none'
         })
          if(!this.isEmpty(this.props.radioPlaying)){
              var radioPlaying = this.props.radioPlaying;              
              var images = document.getElementsByClassName('images')            
                  Array.prototype.forEach.call(images, function(image) {      
                  if (image.name == radioPlaying.name){
                      //   image.style.display = 'inline'                     
                  }        
              });    
          }          
      }
 
   hideAllWaves = ()=>{
    var images = document.getElementsByClassName('images')
      Array.prototype.forEach.call(images, function(image) {      
        
        image.style.display = 'none'
        
      });      
}

 hideWave = (ev)=>{ 
     console.log(ev.target)
    ev.target.parentNode.firstChild.style.display = 'none'
    this.setState({wave:false})
   
}


 render(){
  return (
    <Card style={styles.root} >
      <PlayButton cliquei={()=>{this.props.cliquei();}} radio={this.props.radio} name={this.props.radio.name}>     
            <div style={{position:'absolute',marginLeft: '63px', marginTop: '23px'}} class='spinner' name={this.props.radio.name}>
              <ReactLoading type='spinningBubbles' color="#000000" />              
            </div>
          <img name={this.props.radio.name} src={wavegif}  onClick={(ev)=>{this.props.stopRadioPlaying()}}  style={styles.displayFalse} class='images'  alt="wave"/>   
        <CardMedia
            name={this.props.radio.name}
            onClick={(ev)=>{this.props.setRadioPlaying(this.props.radio)}}
            style={styles.media}
            image={require('../../assets/radios-logos/' + this.props.radio.name + '.jpg')}
            title="Paella dish"
        />
      </PlayButton>
      <CardActions style={styles.actionsButtons} disableSpacing>      
      <div style={styles.contentCard}>
        <div style={styles.info}>  
            <span style={styles.name}>{this.props.radio.name}</span>
            <span style={styles.local}>{this.props.radio.city }</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px', alignItems:'center'}}>  
            <FavoritoIcon likes={this.props.radio.likes} radioKey={this.props.radio.key} action={this.props.action} name={this.props.radio.name}  id={this.props.radio.id}/> 
            <span style={{marginTop: '-4px'}}>{this.props.radio.likes}</span>
            {/* <button onClick={()=>console.log(this)}>click</button> */}
        </div>
      </div>          
      </CardActions>     
    </Card>
  );
 }
}

const mapStateToProps = (state) => {
    return {
        radioPlaying: state.radiosReducer.radioPlaying,
        audioToPlay: state.radiosReducer.audioToPlay
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRadioPlaying: (radio) => dispatch(setRadioPlaying(radio)),
        stopRadioPlaying: () => dispatch(setRadioPlaying())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardRadio)

