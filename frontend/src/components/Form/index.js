import React from 'react';

import { Form } from './styles';

const FormContainer = (props) => {
  return <Form onSubmit={props.onSubmit}>{props.children}</Form>;
};

export default FormContainer;
