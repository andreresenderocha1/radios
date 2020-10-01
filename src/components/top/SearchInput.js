import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {connect} from 'react-redux';
import {fetchRadios, searchRadios, addAudio} from '../../actions/RadiosAction';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 32,
    marginRight: -317,
    backgroundColor: '#1f1d1d',
    width: '300px'
  },
  input: {
    width: '500px',
    height: '41px',
    borderRadius: '2px',
    color: '#d6d6d6',
    paddingLeft: '10px'
  },
  iconButton: {
    padding: 10,
    color: '#d6d6d6'
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
            placeholder="Pesquisar rádio"
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