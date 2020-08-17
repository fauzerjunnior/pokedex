import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import { FiArrowLeft } from 'react-icons/fi';
import FormContainer from '../../components/FormContainer';
import PrimaryButton from '../../components/PrimaryButton';

import Form from '../../components/Form';
import Input from '../../components/Input';
import Cover from '../../components/Cover';

import cover from '../../assets/images/enter.svg';

import api from '../../services/api';

import { FormTitle, LinkText } from './styles';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    try {
      if ((name !== '', email !== '', password !== '')) {
        await api.post('/users', data);

        swal({
          title: 'Bom trabalho!',
          text: `O seu usuário foi criado com sucesso`,
          icon: 'success',
        });

        history.push('/');
      } else {
        swal({
          title: 'Ops!',
          text: 'Preencha os campos corretamente',
          icon: 'error',
        });
      }
    } catch (err) {
      swal({
        title: 'Ops!',
        text: 'Houve um erro no cadastro, tente novamente.',
        icon: 'error',
      });
    }
  }

  return (
    <FormContainer
      title="Cadastrar novo usuário"
      description="Agora precisamos que você nos diga quais os detalhes do pedido."
    >
      <Cover image={cover} size="320" />
      <Form onSubmit={handleRegister}>
        <FormTitle>Preencha com os seus dados</FormTitle>

        <Input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
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

        <PrimaryButton title="Criar conta" onClick />
        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#3f3d55" />
          <LinkText>Voltar</LinkText>
        </Link>
      </Form>
    </FormContainer>
  );
};

export default Register;
