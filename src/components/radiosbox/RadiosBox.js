import React, {useEffect} from 'react';
import {Styl} from 'react-dom';
import Radio from './Radio';
import CardRadio from './CardRadio';
import DrawerCustomize from './DrawerCustomize';
import data from '../../assets/radios.json';
import fire from '../../config';
import { render } from '@testing-library/react';
import {connect} from 'react-redux';
import {fetchRadios, searchRadios, initializeAudios} from '../../actions/RadiosAction';
import MyPlayer from './MyPlayer';



class RadiosBox extends React.Component{ 
    constructor(props){
        super(props)

    }

    componentWillMount(){
        
        this.props.searchRadios(this.props.radios, this.props.genre)      
        setTimeout(()=>console.log(this.props.audios),2000)
    }
  
    render(){
    return (
            <div style={styles.radiosContainer}>
                {/* <button onClick={()=>fire.child('radios').push({name: 'teste'})}>aaa</button> */}
                
            {
            this.props.radiosSearched.map(function(radio){
                return <CardRadio key={Math.random()} radio={radio} ></CardRadio>
            })}
            <div name="classsss" style={{width:400,height:400}}>
            <MyPlayer></MyPlayer>
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

