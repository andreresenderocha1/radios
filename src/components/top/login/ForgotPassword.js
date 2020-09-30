import React from 'react';
import LoginButton from './LoginButton';
import { Icon, Input } from 'semantic-ui-react'
import firebase from 'firebase';


var _this;
class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: "",
            password: ""
        }     
        _this = this;
    }

    handleVoltar(){
        document.getElementById('esqueceuSenhaTab').style.display = 'none'
        document.getElementById('loginTab').style.display = 'inline'
        document.getElementById('cadastrarTab').style.display = 'inline'
        document.getElementById('infoLogin').style.display = 'none'
        document.getElementById('infoLogin').style.background = '#ff5858'
        this.props.backForgotPassord();   
    }

    handleResetPassword(){
        firebase.auth().sendPasswordResetEmail(this.state.email).then(function(){
            console.log('ok reset')
            document.getElementById('infoLogin').style.display = 'flex'
            document.getElementById('infoLogin').style.background = '#31b17b'
            document.getElementById('infoLoginTxt').innerHTML = 'Verifique seu email para resetar o password!'
        }).catch(function(error){
            console.log(error.code)
            if(error.code == 'auth/invalid-email'){                
                document.getElementById('infoLogin').style.display = 'flex'
                document.getElementById('infoLogin').style.background = '#ff5858'
                document.getElementById('infoLoginTxt').innerHTML = 'Email inválido!'
            }
            
            if(error.code == 'auth/user-not-found'){                
                document.getElementById('infoLogin').style.display = 'flex'
                document.getElementById('infoLogin').style.background = '#ff5858'
                document.getElementById('infoLoginTxt').innerHTML = 'Email não cadastrado!'
            }
        })
            
    }

    handleChange(e){
        this.setState({email: e.target.value})
        document.getElementById('infoLogin').style.display = 'none'
        document.getElementById('infoLogin').style.background = '#ff5858'
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
                   
                    <a href="#" style={styles.buttonLogin} onClick={()=>this.handleResetPassword()}>
                        <LoginButton title='Resetar Password' />
                    </a>     

                    <a href="#" onClick={()=>this.handleVoltar()}>
                        voltar
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

export default ForgotPassword;