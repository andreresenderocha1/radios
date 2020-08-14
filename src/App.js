import React from 'react';
import RadiosBox from './components/radiosbox/RadiosBox';

import HeadBar from './components/headbar/HeadBar';
import TabsBar from './components/tabs/TabsBar';
import SideContainer from './components/side/SideContainer';
import DrawerCustomize from './components/radiosbox/DrawerCustomize';
import {connect} from 'react-redux';
import {addAudio} from './actions/RadiosAction';

class App extends React.Component {

    componentDidMount(){
        
       
    }
   
    render(){
  return (
    <div style={styles.containerBody}>
        <HeadBar></HeadBar>
        <TabsBar></TabsBar>
        <div style={styles.containerBody}>
            <div style={styles.containerContaint}>
                {/* <RadiosBox></RadiosBox> */}

            </div>
            {/* <SideContainer></SideContainer> */}
        </div>
    </div>
  );
    }
}

const styles = {
    containerBody: {
        display: 'flex',
        flexDirection: 'column'
    },
    containerContaint: {
        display: 'flex',
        
    },
    containerBody: {
        backgroundColor: 'gray',
       
    }
}

const mapStateToProps = (state) => {
    return {
       radios: state.radiosReducer.radios,
        audios: state.radiosReducer.audios,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAudio: (audio) => dispatch(addAudio(audio))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

