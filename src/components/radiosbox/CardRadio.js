import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';
import PlayCircleOutlineSharpIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import PauseCircleOutline from '@material-ui/icons/PauseCircleOutline';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStateWithCallback from 'use-state-with-callback';
import PlayButton from './PlayButton';
import FavoritoIcon from './FavoritoIcon';
import firebase from 'firebase';
import wavegif from './images/wave.gif';
import {connect} from 'react-redux';
import {setRadioPlaying, stopRadioPlaying} from '../../actions/RadiosAction';
import MyPlayer from './MyPlayer';



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
        margin: 10,
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
        fontSize: 14
    },
    local: {
        fontSize: 14
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
  

class CardRadio extends React.Component {      
    constructor(props) {
        super(props);  
        this.state = {wave: false}  
      } 

       isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

      componentDidMount(){
          if(!this.isEmpty(this.props.radioPlaying)){
              var radioPlaying = this.props.radioPlaying;
            var images = document.getElementsByClassName('images')
            
                Array.prototype.forEach.call(images, function(image) {      
                   if (image.name == radioPlaying.name){
                       image.style.display = 'inline'
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

 showWave = (ev)=>{  
    console.log(firebase.auth().currentUser)    
     
     var images = document.getElementsByClassName('images')
      Array.prototype.forEach.call(images, function(image) {      
        
        image.style.display = 'none'
        
      });
      ev.target.parentNode.firstChild.style.display = 'inline'
      this.setState({wave:true})
   
}
 hideWave = (ev)=>{ 
    ev.target.parentNode.firstChild.style.display = 'none'
    this.setState({wave:false})
   
}

 render(){
  return (
    <Card style={styles.root} >
      <PlayButton cliquei={()=>this.props.cliquei()} radio={this.props.radio} >
          <img name={this.props.radio.name} src={wavegif}  onClick={(ev)=>{this.hideWave(ev);this.props.stopRadioPlaying()}}  style={this.state.wave ? styles.displayTrue:  styles.displayFalse} class='images'  alt="wave"/>
      
        <CardMedia
            name={this.props.radio.name}
            onClick={(ev)=>{this.showWave(ev);this.props.setRadioPlaying(this.props.radio)}}
            style={styles.media}
            image={require('./images/' + this.props.radio.name + '.png')}
            title="Paella dish"
        />
      </PlayButton>
     
      <CardActions style={styles.actionsButtons} disableSpacing>
      
      <div style={styles.contentCard}>

        <div style={styles.info}>  
            <span style={styles.name}>{this.props.radio.name}</span>
            <span style={styles.local}>{this.props.radio.city + ', ' +this.props.radio.country}</span>
        </div>
        <div>  
            <FavoritoIcon action={this.props.action} name={this.props.radio.name}  id={this.props.radio.id}/> 
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRadioPlaying: (radio) => dispatch(setRadioPlaying(radio)),
        stopRadioPlaying: () => dispatch(setRadioPlaying())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardRadio)

