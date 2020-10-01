import React, {Component} from 'react';
import SearchInput from './SearchInput';
import 'semantic-ui-css/semantic.min.css';
import { Popup } from 'semantic-ui-react';
import Login from '../top/login/Login';
import Profile from '../top/login/Profile';
import {connect} from 'react-redux';
import {closeLoginPopup, fetchRadios} from '../../actions/RadiosAction';
import firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import logo from '../../assets/logo.png';


var _this;
class TopContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        console.log()
        _this = this;        
    }

    componentDidMount() {
        this.props.fetchRadios() 
    }

    render(){    
        return (
            <div style={styles.headBarContainer}>
                {/* ENABLE TO CREATE NEW RADIO IN FIREBASE DB. */}
                {/* <button   
                    style={{display:'none'}} 
                    onClick={()=>firebase.database().ref().child("radios")
                        .push({
                            id:39,
                            name:'Atlantida',
                            genre:'pop_genre',
                            country: 'Brasil',
                            city: 'Rio Grande do Sul',
                            url: 'http://42747t.lp.azioncdn.net/2747t/a/mp4:access_options/rtmp-live/atl_poa.sdp/playlist.m3u8?wowzasessionid=845863069'
                        })
                    }    
                >cadastrar</button> */}

                {/* <span style={styles.logoName}>Radios Brasil</span>     */}
                <img src={logo} style={{marginLeft: '32px'}}/>    
                <SearchInput></SearchInput>
                <div style={{display:'flex', alignItems:'center', minWidth:'300px', justifyContent:'flex-end'}}>
                {this.props.user?<span style={{marginRight: '10px',color:'#c7c7c7'}}>{this.props.user.email}</span>:null}
                <Popup
                        trigger={<Avatar style={{alignSelf: 'flex-end',cursor:'pointer',marginRight:'30px',background:'white'}} alt="Remy Sharp" src={ this.props.user? (this.props.user.photoURL ?  this.props.user.photoURL : 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png') : 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'} />}
                        content={this.props.user ?<Profile cliquei={()=>{this.setState({open: false})}}/> : <Login cliquei={()=>{this.setState({open: false})}}/>}
                        basic
                        on='click'
                        pinned
                        style={styles.popup}
                        open={this.state.open}
                        onClose={() => this.setState({open: false})}
                        onOpen={() => this.setState({open: true})}
                    />
                    
                </div>
                
            </div>
        );
    }
}


const styles = {
    popup: {
        left: '-328px',
        top: '40px',
        padding: 0,
        // minWidth: '267px'
    },
    headBarContainer: {
        background: 'rgb(0,0,0,0.76)',
        width: '100%',
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    logoName: {
        color: 'white',
        fontSize: '20px',
        marginLeft: 80
    },
    containerPopup: {
        borderRadius: '2px'
    }
}
const mapStateToProps = (state) => {
    return {
        searchedRadios: state.radiosReducer.searchedRadios,
        loginPopupFlag: state.radiosReducer.loginPopupFlag,
        user: state.radiosReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRadios: () => dispatch(fetchRadios()),
        closeLoginPopup: (bol) => dispatch(closeLoginPopup(bol))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TopContainer)