import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoginTab from './LoginTab';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';


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
    width: 380,
  },
}));

export default function TabLogin(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    document.getElementById('infoLogin').style.display = 'none'
    document.getElementById('infoLogin').style.background = '#ff5858'
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} id='loginTab'/>
          <Tab label="Cadastrar" {...a11yProps(1)} id='cadastrarTab'/>
          <Tab label="Esqueceu Senha" {...a11yProps(2)} style={{display:'none'}} id='esqueceuSenhaTab'/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LoginTab cliquei={()=>props.cliquei()} forgotPassordFn={()=>handleChangeIndex(2)}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <Signup/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <ForgotPassword backForgotPassord={()=>handleChangeIndex(0)}/>
        </TabPanel>
       
        
      </SwipeableViews>      
      <div style={{width: '100%',height: '53px',background: '#ff5858', display:'none', justifyContent:'center', alignItems:'center'}} id='infoLogin'>
          <p style={{fontSize: '18px', color: 'white'}} id='infoLoginTxt'></p>
      </div>
    </div>
  );
}
