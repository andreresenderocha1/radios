import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RadiosBox from '../center/RadiosBox';
import RadiosFavoritasBox from '../center/RadiosFavoritasBox';
import {Link, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setTab, setTabEstadoLabel} from '../../actions/RadiosAction'
import MenuEstados from '../center/MenuEstados'



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  indicator: {
    backgroundColor: "rgb(233,111,111)",
    height: "10px",
    top: "45px"
  },
  tabsWrapper: {
    height: "60px",
    background: "rgb(233,111,111)"
  },
 
}));




function TabsBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState();
  const [reload, setReload] = React.useState('');

  const handleChange = (event, newValue) => {    
    props.setTab(newValue)
  };

  React.useEffect(() => {
  
  });

   
  return (
    <BrowserRouter>
        <MenuEstados></MenuEstados>
        <div className={classes.root}>
          <AppBar style={{marginLeft:285, marginTop: '-85px', backgroundColor: '#333333'}} position="static" color="default">
            <Tabs
            TabIndicatorProps={{ className: classes.indicator }}
              value={props.tab}
              onChange={handleChange}           
              textColor="white"
              variant="scrollable"
             scrollButtons="on"
            >
              <Tab style={{color:'#e2e2e2'}} value="Top 100" label="Top 100" component={Link} to="/one" />
              <Tab style={{color:'#e2e2e2'}} value="Favoritas" label="Favoritas"/>
              <Tab style={{color:'#e2e2e2'}} value="Rock" label="Rock"/>
              <Tab style={{color:'#e2e2e2'}} value="Sertaneja" label="Sertaneja"/>
              <Tab style={{color:'#e2e2e2'}} value="Pop" label="Pop"/>
              <Tab style={{color:'#e2e2e2'}} value="Notícias" label="Notícias"/>
              <Tab style={{color:'#e2e2e2'}} value="Religião" label="Religião"/>
              <Tab style={{color:'#e2e2e2'}} value="Gospel" label="Gospel"/>
              <Tab style={{color:'#e2e2e2'}} value="Esportes" label="Esportes"/>
              <Tab style={{color:'#e2e2e2'}} value="Alternativa" label="Alternativa"/>
              <Tab style={{color:'#e2e2e2'}} value="Reggae" label="Reggae"/>
              <Tab style={{color:'#e2e2e2'}} value="Comunitárias" label="Comunitárias"/>
              <Tab style={{color:'#e2e2e2'}} value="MPB" label="MPB"/>
              <Tab style={{color:'#e2e2e2',display:'none'}} value="tabEstado" label={props.tabEstadoLabel} id='tabEstado'/>
              <MenuEstados></MenuEstados>
            </Tabs>
          </AppBar>

          <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={props.tab} index="Top 100">
        <RadiosBox cliquei={()=>props.cliquei()} genre=''></RadiosBox>
      </TabPanel>
      <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={props.tab} index="Favoritas">
        <RadiosFavoritasBox></RadiosFavoritasBox>
      </TabPanel>
      <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={props.tab} index="Rock">
      <RadiosBox genre='rock_genre'></RadiosBox>
      </TabPanel>
      <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={props.tab} index="Sertaneja">
      <RadiosBox genre='sertanejo_genre'></RadiosBox>
      </TabPanel>
      <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={props.tab} index="Pop">
      <RadiosBox genre='pop_genre'></RadiosBox>
      </TabPanel>
      <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={props.tab} index="tabEstado" id='test'>
      <RadiosBox genre={props.tabEstadoLabel}></RadiosBox>
      </TabPanel>
        </div>
      </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
    return {
        radioPlaying: state.radiosReducer.radioPlaying,
        audioToPlay: state.radiosReducer.audioToPlay,
        tab: state.radiosReducer.tab,
        tabEstadoLabel: state.radiosReducer.tabEstadoLabel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {      
        setTab: (index) => dispatch(setTab(index)),
        setTabEstadoLabel: (label) => dispatch(setTabEstadoLabel(label))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TabsBar)