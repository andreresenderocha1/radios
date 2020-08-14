import React, {Component} from 'react';
import {Styl} from 'react-dom';
import StarIcon from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import fire from '../../config';

import styled from 'styled-components'
import * as Regular from '@styled-icons/boxicons-regular'
import * as Solid from '@styled-icons/boxicons-solid'

const Lock = () => <Lock size="48" title="Unlock account" />
const styles = {

    largeIcon: {
      marginRight: 20
    }
}
const radiosFavoritas = [];



class FavoritoIcon extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        isChecked: false,
        key: ''
      }
  
    } 

    componentDidMount(){
        
        fire.child('Andre').child('RadiosFavoritas').on('value', snapshot=>{
            const radios = snapshot.val();
            
            if(radios != null){
                Object.keys(radios).map(key=> {
                    if (radios[key].id == this.props.id){
                        this.setState({isChecked: true, key: key})

                    }
                })
            }
        })
    }
  
    render() {
      return (
        
        <a href="#" onClick={()=>{
            if(this.state.isChecked){
                fire.child('Andre').child(`RadiosFavoritas/${this.state.key}`).remove();
              
                
            }else{
                fire.child("Andre").child("RadiosFavoritas").push({id:this.props.id, name: this.props.name})
            }
           
            this.setState({ isChecked: !this.state.isChecked })}}>
          { this.state.isChecked
            ?<Solid.Heart size={28} color='#ED4956'/>            
            :<Regular.Heart size={28} color='lightgray'/>
            
          }
          </a>

          
          
      
      );
      
    }
  
  }

  export default FavoritoIcon;