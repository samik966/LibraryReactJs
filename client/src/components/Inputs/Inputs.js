import React from 'react';
import classes from './Inputs.module.css';

const Inputs = props => {
  let El = '';
  switch (props.ElType) {
    case 'input':
      El = (
        <input
          className={classes.InputEl}
          type={props.type}
          value={props.value}
          onChange={props.changed}
          onFocus={props.focused}
          onBlur={props.blurred}
        />
      );
      break;
    case 'textarea':
      El = (
        <textarea
          className={classes.InputEl}
          type={props.type}
          value={props.value}
        />
      );
      break;
    default:
      El = (
        <input
          className={classes.InputEl}
          type={props.type}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.FormGroup}>
  <label className={(props.active) ? classes.active : ''}>{props.Label}</label>  
      {El}
    </div>
  );
};
export default Inputs;
