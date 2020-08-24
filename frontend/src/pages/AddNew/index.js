import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import { FiArrowLeft } from 'react-icons/fi';
import FormContainer from '../../components/FormContainer';
import PrimaryButton from '../../components/PrimaryButton';

import Form from '../../components/Form';
import Input from '../../components/Input';
import Cover from '../../components/Cover';

import cover from '../../assets/images/add.svg';

import api from '../../services/api';

import { FormTitle, LinkText } from './styles';

const AddNew = () => {
  const [name, setName] = useState('');
  const [generation, setGeneration] = useState('');
  const [attackQuantity, setAttackQuantity] = useState(0);
  const [types, setTypes] = useState([]);

  const history = useHistory();
  const userToken = localStorage.getItem('userToken');

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      generation,
      attackQuantity,
      types,
    };

    try {
      if (
        (name !== '', generation !== '', attackQuantity !== '', types !== '')
      ) {
        console.log(data);
        await api.post('/pokemons/page=1', data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        swal({
          title: 'Bom trabalho!',
          text: `O seu novo Pokemon foi criado com sucesso`,
          icon: 'success',
        });

        history.push('/pokemons/page=1');
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

      console.log(err);
    }
  }

  return (
    <FormContainer>
      <Cover image={cover} size="400" />
      <Form onSubmit={handleRegister}>
        <FormTitle>Datalhe o Pokemon</FormTitle>

        <Input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Geração"
          onChange={(e) => setGeneration(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Quantidade de Ataques"
          onChange={(e) => setAttackQuantity(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Tipos"
          onChange={(e) => {
            setTypes(e.target.value.split(', '));
          }}
        />

        <PrimaryButton title="Realizar cadastro" onClick={() => handleRegister} />
        <Link className="back-link" to="/pokemons/page=1">
          <FiArrowLeft size={16} color="#3f3d55" />
          <LinkText>Voltar</LinkText>
        </Link>
      </Form>
    </FormContainer>
  );
};

export default AddNew;
