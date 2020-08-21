import React, {Component} from 'react';
import {Styl} from 'react-dom';
import SearchInput from './SearchInput';
import 'semantic-ui-css/semantic.min.css';
import { Button, Popup } from 'semantic-ui-react';
import Login from '../radiosbox/Login';
import {connect} from 'react-redux';
import {closeLoginPopup} from '../../actions/RadiosAction';

class HeadBar extends React.Component {

    // const [eventsEnabled, setEventsEnabled] = React.useState(true)
    // const [open, setOpen] = React.useState(false)
  
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidUpdate(previousProps, previousState) {
        console.log(this.state.open)
        if (previousProps.loginPopupFlag !== this.props.loginPopupFlag) {
            console.log('entrei')
            
        }
    }

   render(){
    
    return (
        <div style={styles.headBarContainer} >
            <span style={styles.logoName}>Radios Brasil</span>
            <SearchInput></SearchInput>
            <div style={styles.containerPopup}>
                <Popup
                    trigger={<Button icon='add' />}
                    content={<Login />}
                    basic
                    on='click'
                    pinned
                    style={styles.popup}
                    onClose={() => this.setState({open: false})}
                    onOpen={() => this.setState({open: true})}
                />
            </div> 
               
            <button onClick={()=>this.setState({open: false})}>sdffsdf</button>        
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
        background: '#202020',
        width: '100%',
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'

    },
    logoName: {
        color: 'white',
        fontSize: '37px',
        marginLeft: 80
    },
    containerPopup: {
        borderRadius: '2px'
    }
}
const mapStateToProps = (state) => {
    return {
       
        
        loginPopupFlag: state.radiosReducer.loginPopupFlag
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        closeLoginPopup: (bol) => dispatch(closeLoginPopup(bol))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeadBar)