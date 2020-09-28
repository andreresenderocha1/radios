import React from 'react';

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
        borderRadius: '2px',
        boxShadow: '1px 4px 7px -3px rgba(0,0,0,0.75)'
    },
    txtFacebook: {
        fontSize: '18px'
    },
    facebookIcon: {
        fontSize: '26px'
    }
}
