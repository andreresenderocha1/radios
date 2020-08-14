import React, {useEffect} from 'react';
import {Styl} from 'react-dom';
import Radio from './Radio';
import CardRadio from './CardRadio';
import DrawerCustomize from './DrawerCustomize';
import data from '../../assets/radios.json';
import fire from '../../config';
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
        fire.child('Andre').child('RadiosFavoritas').on('value', snapshot=>{  
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
        this.getRadios()       
        
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
        width: '91%',
        height: 907,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: 17,
        marginLeft: 228
        
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

