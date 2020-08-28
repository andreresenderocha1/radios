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


var _this;
class RadiosBox extends React.Component{ 
    constructor(props){
        super(props)
        _this = this;
    }

    componentWillMount(){
        
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
        width: '91%',
        height:  994, 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',       
        marginLeft: 228,
        
        
    }
}

const mapStateToProps = (state) => {
    return {
        radios: state.radiosReducer.radios,
        radiosSearched: state.radiosReducer.radiosSearched,
        audios: state.radiosReducer.audios,
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

