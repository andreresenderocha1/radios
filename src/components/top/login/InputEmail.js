import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
}));

export default function InputEmail() {
  const classes = useStyles();
  const [email, setValues] = React.useState();

  return (
    <div className={classes.root}>   
        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <TextField id="filled-basic" label="email" variant="filled" />
        </FormControl>
    </div>
  );
}
