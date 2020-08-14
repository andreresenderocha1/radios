import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {connect} from 'react-redux';
import {searchRadiosAction} from '../../actions/RadiosAction';
import {fetchRadios, searchRadios, addAudio} from '../../actions/RadiosAction';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 32,
    marginRight: 518
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const  SearchInput = (props)=> {
  const [allRadios, setAllRadios] = useState([])

  useEffect(()=>{
    props.fetchRadios()
  
  },[])
  
  const classes = useStyles();
 

  return (
    <Paper component="form" className={classes.root}>
      
      <InputBase
        className={classes.input}
        placeholder="a"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(ev)=>props.searchRadios(props.radios, ev.target.value)}
      />
      <IconButton  type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      
      
    </Paper>
  );
}


const mapStateToProps = (state) => {
    return {
        radios: state.radiosReducer.radios,
        audios: state.radiosReducer.audios,
        radiosSearched: state.radiosReducer.radiosSearched
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRadios: () => dispatch(fetchRadios()),
        searchRadios: (array, str) => dispatch(searchRadios(array, str)),
        addAudio: (audio) => dispatch(addAudio(audio))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchInput)