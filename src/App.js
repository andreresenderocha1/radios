import React from 'react';
import TopContainer from './components/top/TopContainer';
import TabsBar from './components/center/TabsBar';
import {connect} from 'react-redux';
import {addAudio, setUser} from './actions/RadiosAction';
import MyPlayer from './components/left/MyPlayer';
import MySlider from './components/left/MySlider';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyANSv5TdnsHMOLpaKml7MWArEtNwksVY7Y",
    authDomain: "radiosbrasil-4e33f.firebaseapp.com",
    databaseURL: "https://radiosbrasil-4e33f.firebaseio.com",
    projectId: "radiosbrasil-4e33f",
    storageBucket: "radiosbrasil-4e33f.appspot.com",
    messagingSenderId: "501016301056",
    appId: "1:501016301056:web:bc0fea0f8a5f84b288d2e5",
    measurementId: "G-JFJDKWSHQ5"
  });


   

class App extends React.Component {

    
    componentDidMount(){
        
        this.authListener()
       
    }

    authListener(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user && firebase.auth().currentUser.emailVerified){
               this.props.setUser(user);
            }else{
                this.props.setUser(null); 
            }
        })
    }

   
   
    render(){
  return (
    <div style={styles.containerBody}>
        <TopContainer></TopContainer>
        <MySlider></MySlider>
        <TabsBar ></TabsBar>
        
        <MyPlayer></MyPlayer>
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
        addAudio: (audio) => dispatch(addAudio(audio)),
        setUser: (user) => dispatch(setUser(user)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

