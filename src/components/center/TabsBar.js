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
  const [value, setValue] = React.useState('one');
  const [reload, setReload] = React.useState('');

  const handleChange = (event, newValue) => {    
    setValue(newValue);      
  };

 
  return (
    <BrowserRouter>
        <div className={classes.root}>
          <AppBar style={{marginLeft:285, marginTop: '-37px', backgroundColor: '#333333'}} position="static" color="default">
            <Tabs
            TabIndicatorProps={{ className: classes.indicator }}
              value={value}
              onChange={handleChange}           
              textColor="white"
              fullWidth
            >
              <Tab style={{color:'#e2e2e2'}} value="one" label="Top 100" component={Link} to="/one" />
              <Tab style={{color:'#e2e2e2'}} value="two" label="Favoritas"/>
              <Tab style={{color:'#e2e2e2'}} value="three" label="Rock"/>
              <Tab style={{color:'#e2e2e2'}} value="four" label="Sertaneja"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="Pop"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="Notícias"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="Religião"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="Gospel"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="Esportes"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="Alternativa"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="Reggae"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="Comunitárias"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="MPB"/>
              <Tab style={{color:'#e2e2e2'}} value="five" label="Estados"/>
            </Tabs>
          </AppBar>

          <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={value} index="one">
        <RadiosBox cliquei={()=>props.cliquei()} genre=''></RadiosBox>
      </TabPanel>
      <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={value} index="two">
        <RadiosFavoritasBox></RadiosFavoritasBox>
      </TabPanel>
      <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={value} index="three">
      <RadiosBox genre='rock_genre'></RadiosBox>
      </TabPanel>
      <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={value} index="four">
      <RadiosBox genre='sertanejo_genre'></RadiosBox>
      </TabPanel>
      <TabPanel style={{overflowY:'auto',overflowX: 'hidden', marginLeft: '285px', backgroundColor: '#292929'}} value={value} index="five">
      <RadiosBox genre='pop_genre'></RadiosBox>
      </TabPanel>
        </div>
      </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
    return {
        radioPlaying: state.radiosReducer.radioPlaying,
        audioToPlay: state.radiosReducer.audioToPlay
    }
}



export default connect(mapStateToProps)(TabsBar)