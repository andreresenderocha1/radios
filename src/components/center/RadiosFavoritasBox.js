import React, {useEffect} from 'react';
import CardRadio from './CardRadio';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {fetchRadios} from '../../actions/RadiosAction';

class RadiosFavoritasBox extends React.Component {    
    constructor(props){
        super(props)
        this.state = {
            radiosFavoritas: [],
            rFavoritas: []
        }
    }
   
    getRadios(){              
        firebase.database().ref().child(firebase.auth().currentUser.uid).child('RadiosFavoritas').on('value', snapshot=>{  
            var array = []
            snapshot.forEach(item=>{  
                           
                array.push(item.val())  
            })   
            var array2 = []
           
            this.props.radios.map(radio => {
                array.map(favorita=>{
                    if(radio.id == favorita.id){
                        array2.push(radio)
                    }
                })
            })
            this.setState({radiosFavoritas:  array2})
        })
        
    }
    componentDidMount(){
        if(firebase.auth().currentUser){
            this.getRadios();
        }        
    }

    render(){
        return (
            <div style={styles.radiosContainer}>                
            {
            this.state.radiosFavoritas.map(function(radio){
                return <CardRadio key={Math.random()} radio={radio} ></CardRadio>
            })}
            </div>
        );
    }
}

const styles = {
    radiosContainer: {
        height: 907,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        paddingTop: 17,
        marginLeft: 288
        
    }
}
const mapStateToProps = (state) => {
    return {
        radios: state.radiosReducer.radios
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRadios: () => dispatch(fetchRadios())        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RadiosFavoritasBox)

