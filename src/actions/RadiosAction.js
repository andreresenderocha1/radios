import firebase from 'firebase';


export const searchRadiosSuccess = (radiosArray) => ({
    type: "SEARCH",
    payload: radiosArray
});

export const fetchRadiosSuccess = (radiosArray) => ({
    type: "GET_ALL",
    payload: radiosArray
});


export const initializeAudios = () => ({
    type: "INITIALIZE_AUDIO",
    payload: []
});

export const addAudio = (audio) => ({
    type: "ADD_AUDIO",
    payload: audio
});

export const setRadioPlaying = (radio) => ({
    type: "SET_RADIO_PLAYING",
    payload: radio
});

export const stopRadioPlaying = () => ({
    type: "STOP_RADIO_PLAYING"
    
});

export const setAudioToPlay = (audio) => ({
    type: "SET_AUDIO_TO_PLAY",
    payload: audio
});

export const setUrlToPlay = (url) => ({
    type: "SET_URL_TO_PLAY",
    payload: url
});

export const setPlayMusic = (bol) => ({
    type: "SET_PLAY_MUSIC",
    payload: bol
});

export const setUser = (user) => ({
    type: "SET_USER",
    payload: user
});

export const closeLoginPopup = (bol) => ({
    type: "CLOSE_LOGIN_POPUP",
    payload: bol
});

export const setTab = (index) => ({
    type: "SET_TAB",
    payload: index
});

export const setTabEstadoLabel = (label) => ({
    type: "SET_TAB_ESTADO_LABEL",
    payload: label
});

export const fetchRadios = ()=>{
    return (dispatch)=>{
        firebase.database().ref().child('radios').on('value', snapshot=>{
            var radiosArray = []
            var audiosArray = []
            Object.keys(snapshot.val()).map(radio=>{
                radiosArray.push({key: radio, ...snapshot.val()[radio]});
            })
            
            dispatch(fetchRadiosSuccess(radiosArray))
        })
        
    }
}

export const searchRadios = (radios, str) => {  
    return (dispatch) => {
        if (radios){
            var arrayName = []
            var arrayCity = []
            var arrayCountry = []
            var arrayGenre = []
            var arrayAll = []
            arrayName = radios.filter((radio)=> radio.name.toLowerCase().includes(str.toLowerCase()))
            if (arrayName){
                Array.prototype.push.apply(arrayAll, arrayName);
            }
            arrayCity = radios.filter((radio)=> radio.city.toLowerCase().includes(str.toLowerCase()))
            if (arrayCity){
                Array.prototype.push.apply(arrayAll, arrayCity);
            }
            arrayGenre = radios.filter((radio)=> radio.genre.toLowerCase().includes(str.toLowerCase()))
            if (arrayGenre){
                Array.prototype.push.apply(arrayAll, arrayGenre);
            }
            arrayCountry = radios.filter((radio)=> radio.country.toLowerCase().includes(str.toLowerCase()))
            if (arrayCountry){
                Array.prototype.push.apply(arrayAll, arrayCountry);
            }
            if(arrayAll){
                let unique = [...new Set(arrayAll)];
                dispatch(searchRadiosSuccess(unique))
            }
        }
        
    }
}


