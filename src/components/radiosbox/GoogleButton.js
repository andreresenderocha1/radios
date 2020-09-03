import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function GoogleButton() { 

  return (
    <div style={styles.facebookButton}>
        <FontAwesomeIcon style={styles.facebookIcon} icon={faGoogle} />
        <span style={styles.txtFacebook}>Google</span>
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
        background: 'rgb(199,46,27)',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '2px'
    },
    txtFacebook: {
        fontSize: '18px'
    },
    facebookIcon: {
        fontSize: '22px'
    }
}
