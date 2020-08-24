import React from 'react';

import { InputField } from './styles';

const Input = (props) => {
  return (
    <InputField
      placeholder={props.placeholder}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default Input;
