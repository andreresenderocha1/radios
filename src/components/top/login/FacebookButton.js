import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

export default function FacebookButton() { 
  return (
    <div style={styles.facebookButton}>
        <div style={styles.containerIcon}>
            <FontAwesomeIcon style={styles.facebookIcon} icon={faFacebookF} />
        </div>
        <span style={styles.txtFacebook}>Login com <span>Facebook</span></span>
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
        background: 'rgb(61 94 162)',
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
        fontSize: '22px',
        position: 'relative',
        top: '-8px'
    },
    containerIcon: {
        marginLeft: '-42px',
        width: '44px',
        height: '33px',
        background: 'rgb(46 75 136)',
    }
}
