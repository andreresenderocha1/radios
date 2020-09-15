import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function GoogleButton() { 

  return (
    <div style={styles.facebookButton}>
        <div style={styles.containerIcon}>
            <FontAwesomeIcon style={styles.facebookIcon} icon={faGoogle} />
        </div>
        <span style={styles.txtFacebook}>Login com <span>Google</span></span>
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
        background: '#DB4437',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '2px',
        boxShadow: '1px 4px 7px -3px rgba(0,0,0,0.75)'
    },
    txtFacebook: {
        fontSize: '14px'
    },
    facebookIcon: {
        fontSize: '19px',
        position: 'relative',
        top: '-8px'
    },
    containerIcon: {
        marginLeft: '-50px',
        width: '44px',
        height: '33px',
        background: '#c51b0d'
    }
}
