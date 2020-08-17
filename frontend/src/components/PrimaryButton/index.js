import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import { Button } from './styles';

const PrimaryButton = (props) => {
  return (
    <Button type={props.type} onClick={props.onClick}>
      {props.title}
      <FiArrowRight size={16} color="#fff" />
    </Button>
  );
};

export default PrimaryButton;
