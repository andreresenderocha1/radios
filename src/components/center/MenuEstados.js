import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Tab from '@material-ui/core/Tab';
import {setTab, setTabEstadoLabel, searchRadios} from '../../actions/RadiosAction'
import {connect} from 'react-redux';
import { Label } from 'semantic-ui-react';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function MenuEstados(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {      
    setAnchorEl(null);
    document.getElementById('tabEstado').style.display = 'inline'
    props.setTab('tabEstado')
    props.setTabEstadoLabel(e.target.firstChild.textContent)
    props.searchRadios(props.radios, e.target.firstChild.textContent)
  };

  return (
    <div>     
      <Tab style={{color:'#e2e2e2'}} value="fourteen" label="Estados" onClick={handleClick}/>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted={false}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>      
          <ListItemText primary="Distrito Federal" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>       
          <ListItemText primary="Mato Grosso" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>         
          <ListItemText primary="São Paulo" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>         
          <ListItemText primary="Rio de Janeiro" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>         
          <ListItemText primary="Minas Gerais" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>         
          <ListItemText primary="Rio Grande do Sul" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>         
          <ListItemText primary="Goias" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>         
          <ListItemText primary="Maranhão" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>          
          <ListItemText primary="Manaus" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}


const mapStateToProps = (state) => {
    return {
        radioPlaying: state.radiosReducer.radioPlaying,
        audioToPlay: state.radiosReducer.audioToPlay,
        tab: state.radiosReducer.tab,
        radios: state.radiosReducer.radios,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchRadios: (array, str) => dispatch(searchRadios(array, str)),

        setTab: (index) => dispatch(setTab(index)),
        setTabEstadoLabel: (label) => dispatch(setTabEstadoLabel(label))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MenuEstados)