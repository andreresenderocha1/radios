import React, {Component} from 'react';
import {Styl} from 'react-dom';

class Radio extends React.Component {
    state = {play: false}

    
    audio = new Audio('https://servidor26.brlogic.com:8084/live?1595095084584')    
      
    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
        
    }

    render(){
        return (
            <div style={styles.radiosContainer} onClick={this.togglePlay}>
                
            </div>
        );
    }
}

const styles = {
    radiosContainer: {
        backgroundRepeat: 'round',
        width: 140,
        height: 140,
        marginRight: 10, 
        marginBottom: 10,    
        borderRadius: 8,
        boxShadow: '0px 1px 2px 1px rgba(0,0,0,.1)',
        backgroundSize: 'contain'
        
    }
}

export default Radio;
