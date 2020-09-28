import React, {Component} from 'react';
import firebase from 'firebase';
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
        if(firebase.auth().currentUser){
        firebase.database().ref().child(firebase.auth().currentUser.uid).child('RadiosFavoritas').on('value', snapshot=>{
            const radios = snapshot.val();            
            if(radios != null){
                Object.keys(radios).map(key=> {
                    if (radios[key].id == this.props.id){
                        this.setState({isChecked: true, key: key})

                    }
                })
            }
        })}
    }
  
    render() {
      return (        
        <a href="#" onClick={()=>{
            if(this.state.isChecked){
                firebase.database().ref().child(firebase.auth().currentUser.uid).child(`RadiosFavoritas/${this.state.key}`).remove();    
            }else{
                firebase.database().ref().child(firebase.auth().currentUser.uid).child("RadiosFavoritas").push({id:this.props.id, name: this.props.name})
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