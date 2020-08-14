import fire from '../config';
import {getAllRadios} from '../actions/RadiosAction';


const initialState = {
    radios: [],
    radiosSearched: [],
    audios: [],
    radioPlaying: {},
    audioToPlay: {},
    urlToPlay: '',
    playMusic: false
}



const radiosReducer =  (state = initialState, action) => {
    switch (action.type) {
      case "SEARCH":      
        return {
            ...state,
            radiosSearched: action.payload,  
            radios: [...state.radios]        
        }
      case "GET_ALL":
        return {
            ...state,
          radios: action.payload,
          radiosSearched: action.payload
          
        };
        case "INITIALIZE_AUDIO":
       
        return { 
        ...state,
        audios: []
        }
     case "ADD_AUDIO":
        
        return { 
        ...state,
        audios: [...state.audios, action.payload]
        }
        case "SET_RADIO_PLAYING":
               
           return { 
           ...state,
           radioPlaying: action.payload
           }
        case "STOP_RADIO_PLAYING":
            
        return { 
        ...state,
        radioPlaying: null
        }
        case "SET_AUDIO_TO_PLAY":
            
            return { 
            ...state,
            audioToPlay: action.payload
            }
            case "SET_URL_TO_PLAY":
            
                return { 
                ...state,
                urlToPlay: action.payload
                }
                case "SET_PLAY_MUSIC":
            
                return { 
                ...state,
                playMusic: action.payload
                }
            
        
      default:
        return state;
    }
  };

  

  export default radiosReducer;
  