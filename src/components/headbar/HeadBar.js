import React, {Component} from 'react';
import {Styl} from 'react-dom';
import SearchInput from './SearchInput';
import 'semantic-ui-css/semantic.min.css';
import { Button, Popup } from 'semantic-ui-react';
import Login from '../radiosbox/Login';
import Profile from '../radiosbox/Profile';
import {connect} from 'react-redux';
import {closeLoginPopup, fetchRadios} from '../../actions/RadiosAction';
import firebase from 'firebase';
import TestSearch from './TestSearch';
import Avatar from '@material-ui/core/Avatar';


var _this;
class HeadBar extends React.Component {

    // const [eventsEnabled, setEventsEnabled] = React.useState(true)
    // const [open, setOpen] = React.useState(false)
  
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        console.log()
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
      
            <TestSearch></TestSearch>
            
            <Popup
                    trigger={<Avatar style={{cursor:'pointer',marginRight:'30px',background:'white'}} alt="Remy Sharp" src={ this.props.user? this.props.user.photoURL : 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'} />}
                    content={this.props.user ?<Profile cliquei={()=>{this.setState({open: false})}}/> : <Login cliquei={()=>{this.setState({open: false})}}/>}
                    basic
                    on='click'
                    pinned
                    style={styles.popup}
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    onOpen={() => this.setState({open: true})}
                />
            
        </div>
    );
}
}


const styles = {
    popup: {
        left: '-328px',
        top: '40px',
        padding: 0
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
        loginPopupFlag: state.radiosReducer.loginPopupFlag,
        user: state.radiosReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRadios: () => dispatch(fetchRadios()),
        closeLoginPopup: (bol) => dispatch(closeLoginPopup(bol))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeadBar)