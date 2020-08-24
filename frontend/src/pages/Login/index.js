import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import FormContainer from '../../components/FormContainer';
import PrimaryButton from '../../components/PrimaryButton';

import Form from '../../components/Form';
import Input from '../../components/Input';
import Cover from '../../components/Cover';

import cover from '../../assets/images/enter.svg';

import { FormTitle, LinkText } from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post('sessions', data);

      localStorage.setItem('userToken', response.data.token);

      history.push('/pokemons/page=1');
    } catch (err) {
      swal({
        title: 'Ops!',
        text: 'Houve uma falha no login, tente novamente.',
        icon: 'error',
      });

      console.log(err);
    }
  }

  return (
    <FormContainer>
      <Cover image={cover} size="320" />
      <Form onSubmit={handleLogin}>
        <FormTitle>Entre com os seus dados</FormTitle>

        <Input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <PrimaryButton type="submit" title="Fazer login" />

        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#3f3d55" />
          <LinkText>Voltar</LinkText>
        </Link>
      </Form>
    </FormContainer>
  );
};

export default Login;
