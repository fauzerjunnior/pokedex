import React from 'react';
// import DetailsForm from '../DetailsForm';

import { NewUserContainer, Content } from './styles';

const FormContainer = (props) => {
  return (
    <NewUserContainer>
      <Content>{props.children}</Content>
    </NewUserContainer>
  );
};

export default FormContainer;
