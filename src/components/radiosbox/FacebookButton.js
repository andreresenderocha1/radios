import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF , } from '@fortawesome/free-brands-svg-icons';

export default function FacebookButton() { 

  return (
    <div style={styles.facebookButton}>
        <FontAwesomeIcon style={styles.facebookIcon} icon={faFacebookF} />
        <span style={styles.txtFacebook}>Facebook Login</span>
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
        background: '#3B5998',
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
