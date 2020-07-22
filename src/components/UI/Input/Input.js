import classes from './Input.css';
import React from 'react';

const input = props => {
  let inputEl = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched)
  {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType)
  {
    case ('input'):
      inputEl = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
      break;
    case ('textarea'):
      inputEl = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('select'):
      inputEl =
        <select
          onChange={props.changed}
          className={inputClasses.join(' ')}
          value={props.value}>
          {
            props.elementConfig.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {
                  opt.displayValue
                }
              </option>
            ))
          }
        </select>
      break;
    default:
      inputEl = <input
        onChange={props.changed}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} />;
  }
  return (
    <div>
      <label>
        {props.label}
      </label>
      {inputEl}
    </div>
  )
}

export default input;