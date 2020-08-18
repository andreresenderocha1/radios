import React, {Component} from 'react';
import {Styl} from 'react-dom';
import SearchInput from './SearchInput';
import Login from '../radiosbox/Login';


class HeadBar extends React.Component {
  
    render(){
        return (
            <div style={styles.headBarContainer} >
                <span style={styles.logoName}>Radios Brasil</span>
                <SearchInput></SearchInput>
                <Login></Login>
            </div>
        );
    }
}

const styles = {
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
    }
}

export default HeadBar;
