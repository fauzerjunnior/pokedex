import React, { useEffect, useCallback, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
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

const Edit = () => {
  const [name, setName] = useState('');
  const [generation, setGeneration] = useState('');
  const [attackQuantity, setAttackQuantity] = useState(0);
  const [types, setTypes] = useState([]);

  const { id } = useParams();

  const [isFetching, setIsFetching] = useState(true);

  const history = useHistory();
  const userToken = localStorage.getItem('userToken');

  const loadPokemon = useCallback(() => {
    api
      .get(`pokemons/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setName(response.data.name);
        setGeneration(response.data.generation);
        setAttackQuantity(response.data.attackQuantity);
        setTypes(response.data.types);
        setIsFetching(false);
      });
  }, [id, userToken]);
  
  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  async function handleUpdate(e) {
    e.preventDefault();

    const data = {
      name,
      generation,
      attackQuantity,
      types: types.split(', '),
    };

    try {
      if (
        (name !== '', generation !== '', attackQuantity !== '', types !== '')
      ) {
        await api.put(`/pokemons/${id}`, data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        swal({
          title: 'Bom trabalho!',
          text: `O seu novo Pokemon foi atualizado com sucesso`,
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
      { !isFetching ? 
        <>
          <Cover image={cover} size="400" />
          <Form onSubmit={handleUpdate}>
            <FormTitle>Datalhe o Pokemon</FormTitle>
              <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Geração"
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Quantidade de Ataques"
              value={attackQuantity}
              onChange={(e) => setAttackQuantity(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Tipos"
              value={types}
              onChange={(e) => {
                setTypes(e.target.value);
              }}
            />

            <PrimaryButton title="Realizar cadastro" onClick={() => handleUpdate} />
            
            <Link className="back-link" to="/pokemons/page=1">
              <FiArrowLeft size={16} color="#3f3d55" />
              <LinkText>Voltar</LinkText>
            </Link>
          </Form>
        </> : (<h1>Carregando</h1>)}
    </FormContainer>
  );
};

export default Edit;
