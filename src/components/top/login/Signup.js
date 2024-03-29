import React from 'react';
import LoginButton from './LoginButton';
import { Icon, Input } from 'semantic-ui-react'
import firebase from 'firebase';


var _this;
class Signup extends React.Component {
    constructor(props){
        super(props)  
        // this.login = this.login.bind(this)
        // this.signup = this.signup.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        
        this.state = {
            email: "",
            password: ""
        }     
        _this = this;
    }

    signup(e){    
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(_this.state.email, _this.state.password).then(result => {
            firebase.auth().currentUser.sendEmailVerification().then(result => {
                document.getElementById('infoLogin').style.display = 'flex'
                document.getElementById('infoLogin').style.background = '#31b17b'
                document.getElementById('infoLoginTxt').innerHTML = 'Conta cadastrada verifique seu email!'
            });
        }).catch(error => {
            console.log(error)
            if(error.code == 'auth/invalid-email'){                
                document.getElementById('infoLogin').style.display = 'flex'
                document.getElementById('infoLogin').style.background = '#ff5858'
                document.getElementById('infoLoginTxt').innerHTML = 'Email inválido!'
            }
            
            if(error.code == 'auth/email-already-in-use'){                
                document.getElementById('infoLogin').style.display = 'flex'
                document.getElementById('infoLogin').style.background = '#ff5858'
                document.getElementById('infoLoginTxt').innerHTML = 'Email já cadastrado!'
            }
        })
    }

    handleChange(e){
        document.getElementById('infoLogin').style.display = 'none'
        document.getElementById('infoLogin').style.background = '#ff5858'
        this.setState({
            [e.target.name] : e.target.value
        })
    }
   
    render(){
        return (
            <div>        
                <hr style={styles.linha}/>
                <div style={styles.containerInputs}>
                    <Input iconPosition='left' name='email' placeholder='Email' onChange={(e)=>this.handleChange(e)}>
                        <Icon name='user' />
                        <input />
                    </Input>
                    <Input iconPosition='left' name='password' placeholder='Senha' onChange={(e)=>this.handleChange(e)}>
                        <Icon name='lock' />
                        <input />
                    </Input>
                    <a href="#" style={styles.buttonLogin} onClick={this.signup}>
                        <LoginButton title='Cadastrar' />
                    </a>                        
                </div>
            </div>
        );
    }
}


const styles = {
    linha: {
        width: '256px', 
        borderTop: '1px solid #cecece',
        borderBottom: 'none',
        borderRight: 'none',
        borderLeft: 'none',        
    },
    containerPopup: {
        width: '500px',
        height: '400px',
        backgroundColor: 'lightgoldenrodyellow',
        zIndex: 9999,
        position: 'absolute',
        right: '20px',
        top: '100px',
        borderRadius: '10px'        
    },
    txtLogin: {
        textAlign: 'center'
    },
    containerButtons: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    containerInputs: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-around',
        padding: '35px'
    }
    
}

export default Signup;