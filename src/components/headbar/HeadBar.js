import React, {Component} from 'react';
import {Styl} from 'react-dom';
import SearchInput from './SearchInput';
import 'semantic-ui-css/semantic.min.css';
import { Button, Popup } from 'semantic-ui-react';
import Login from '../radiosbox/Login';
import {connect} from 'react-redux';
import {closeLoginPopup, fetchRadios} from '../../actions/RadiosAction';
import firebase from 'firebase';
import TestSearch from './TestSearch';


var _this;
class HeadBar extends React.Component {

    // const [eventsEnabled, setEventsEnabled] = React.useState(true)
    // const [open, setOpen] = React.useState(false)
  
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        _this = this;
    }

    componentDidMount() {
            this.props.fetchRadios()
            
    }

    handle(){
        
        
    }

   render(){
    
    return (
        <div style={styles.headBarContainer} >
            <span style={styles.logoName}>Radios Brasil</span>
            {/* <SearchInput></SearchInput> */}
      
            <TestSearch></TestSearch>
        
    <p style={{color:'white'}}>{firebase.auth().currentUser ? firebase.auth().currentUser.displayName : null}</p>
            <div style={styles.containerPopup}>
                <Popup
                    trigger={<Button icon='add' />}
                    content={<Login cliquei={()=>{this.setState({open: false})}}/>}
                    basic
                    on='click'
                    pinned
                    style={styles.popup}
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    onOpen={() => this.setState({open: true})}
                />
            </div> 
               
            
        </div>
    );
}
}


const styles = {
    popup: {
        left: '-285px',
        top: '40px'
    },
    headBarContainer: {
        background: 'rgb(0,0,0,0.76)',
        width: '100%',
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    logoName: {
        color: 'white',
        fontSize: '20px',
        marginLeft: 80
    },
    containerPopup: {
        borderRadius: '2px'
    }
}
const mapStateToProps = (state) => {
    return {
        searchedRadios: state.radiosReducer.searchedRadios,
        loginPopupFlag: state.radiosReducer.loginPopupFlag
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRadios: () => dispatch(fetchRadios()),
        closeLoginPopup: (bol) => dispatch(closeLoginPopup(bol))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeadBar)