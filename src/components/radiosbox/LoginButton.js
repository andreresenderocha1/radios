import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginButton(props) { 

  return (
    <div style={styles.facebookButton}>
        <span style={styles.txtFacebook}>{props.title}</span>
    </div>
  );
}

const styles = {
    facebookButton: {
        fontSize: '30px',
        width: '100%',
        height: '33px',
        textAlign: 'center',
        textDecoration: 'none',
        margin: '5px 2px',
        background: 'rgb(40,169,115)',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '7px'
    },
    txtFacebook: {
        fontSize: '18px'
    },
    facebookIcon: {
        fontSize: '26px'
    }
}
