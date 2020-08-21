import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function GoogleButton() { 

  return (
    <div style={styles.facebookButton}>
        <FontAwesomeIcon style={styles.facebookIcon} icon={faGoogle} />
        <span style={styles.txtFacebook}>Google Login</span>
    </div>
  );
}

const styles = {
    facebookButton: {
        fontSize: '30px',
        width: '205px',
        height: '42px',
        textAlign: 'center',
        textDecoration: 'none',
        margin: '5px 2px',
        background: 'rgb(199,46,27)',
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
