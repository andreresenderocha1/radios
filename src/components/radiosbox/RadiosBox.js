import React, {useEffect} from 'react';
import {Styl} from 'react-dom';
import Radio from './Radio';
import CardRadio from './CardRadio';
import DrawerCustomize from './DrawerCustomize';
import data from '../../assets/radios.json';
import { render } from '@testing-library/react';
import {connect} from 'react-redux';
import {fetchRadios, searchRadios, initializeAudios} from '../../actions/RadiosAction';
import MyPlayer from './MyPlayer';
import TestSearch from '../headbar/TestSearch';


var _this;
class RadiosBox extends React.Component{ 
    constructor(props){
        super(props)
        _this = this;
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentDidUpdate(oldValue, newValue){
    
        if(this.props.radioPlaying){
            if(oldValue.radioPlaying.name == this.props.radioPlaying.name){
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
        }else{
            var radioPlaying = this.props.radioPlaying;
                
            var images = document.getElementsByClassName('images')
            Array.prototype.forEach.call(images, function(image) {      
                if (image.name == oldValue.radioPlaying.name){
                    image.style.display = 'none'                     
                }
    
            });    
        }
    
    }

    componentDidMount(){
       
        this.props.searchRadios(this.props.radios, this.props.genre)      
    }
  
    render(){
    return (
            <div style={styles.radiosContainer}>
                {/* <button onClick={()=>fire.child('radios').push({name: 'teste'})}>aaa</button> */}
                
            {
            this.props.radiosSearched.map(function(radio){
                return <CardRadio cliquei={()=>_this.props.cliquei()} key={Math.random()} radio={radio} ></CardRadio>
            })}
            <div name="classsss" style={{width:400,height:400}}>
            
            </div>

            </div>
    );
        }
    
}

const styles = {
    radiosContainer: {
        height:  994, 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',       
        marginLeft: 288,
        
        
    }
}

const mapStateToProps = (state) => {
    return {
        radios: state.radiosReducer.radios,
        radiosSearched: state.radiosReducer.radiosSearched,
        audios: state.radiosReducer.audios,
        radioPlaying: state.radiosReducer.radioPlaying,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRadios: () => dispatch(fetchRadios()),
        searchRadios: (array, str) => dispatch(searchRadios(array, str)),
        initializeAudios: () => dispatch(initializeAudios()),
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RadiosBox)

