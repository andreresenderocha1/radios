import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF , } from '@fortawesome/free-brands-svg-icons';

export default function FacebookButton() { 

  return (
    <div style={styles.facebookButton}>
        <div>
        <FontAwesomeIcon style={styles.facebookIcon} icon={faFacebookF} />
        </div>
        <span style={styles.txtFacebook}>Facebook</span>
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '2px'
    },
    txtFacebook: {
        fontSize: '18px'
    },
    facebookIcon: {
        fontSize: '26px'
    }
}
