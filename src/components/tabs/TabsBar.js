import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RadiosBox from '../radiosbox/RadiosBox';
import RadiosFavoritasBox from '../radiosbox/RadiosFavoritasBox';
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom';
import Test from './Test';
import Test2 from './Test2';
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
          <AppBar style={{marginLeft:285}} position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab value="one" label="Top 100" component={Link} to="/one" />
              <Tab value="two" label="Favoritas"  />
              <Tab value="three" label="Rock"  />
              <Tab value="four" label="Sertanejo"  />
              <Tab value="five" label="Pop"  />
            </Tabs>
          </AppBar>

          <TabPanel style={{overflowY:'auto',overflowX: 'hidden'}} value={value} index="one">
        <RadiosBox cliquei={()=>props.cliquei()} genre=''></RadiosBox>
      </TabPanel>
      <TabPanel value={value} index="two">
        <RadiosFavoritasBox></RadiosFavoritasBox>
      </TabPanel>
      <TabPanel value={value} index="three">
      <RadiosBox genre='rock_genre'></RadiosBox>
      </TabPanel>
      <TabPanel value={value} index="four">
      <RadiosBox genre='sertanejo_genre'></RadiosBox>
      </TabPanel>
      <TabPanel value={value} index="five">
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