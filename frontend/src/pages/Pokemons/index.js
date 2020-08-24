import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';

import { FiPower, FiPlus, FiTrash2, FiSettings } from 'react-icons/fi';

import Logo from '../../components/Logo';
import Pagination from '../../components/Pagination';

import api from '../../services/api';

import {
  PokemonContainer,
  HeaderContent,
  ActionContainer,
  ListContainer,
  Content,
  Header,
  Span,
  Button,
  ButtonNoBorder,
  ItemList,
  Text,
  Title,
  ResultTitle
} from './styles';

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [ResultLabel, setResultLabel] = useState('');

  const [isFetching, setIsFetching] = useState(true);

  const history = useHistory();
  const userToken = localStorage.getItem('userToken');

  const { page } = useParams();

  const loadPokemon = useCallback(() => {
    api
      .get('pokemons', {
        params: {
          page: page,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setPokemons(response.data);
        setIsFetching(false);

        if (
          response.data.length !== 0 &&
          response.data !== null &&
          response.data !== 'undefined'
        ) {
          setResultLabel('Pokemons encontrados');
        } else {
          setResultLabel('Nenhum pokemon encontrado');
          
        }
      });

  }, [userToken, page]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  function handleAddNewPokemon() {
    history.push('/add-new-pokemon');
  }

  function handleEditPokemon(id) {
    history.push(`/edit/${id}`, id);
  }

  function handleDeletePokemon(id) {
    try {
      api.delete(`pokemons/${id}`, { 
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then(() => {
        swal({
          title: 'Deu certo!',
          text: 'O pokemon foi excluído com sucesso.',
          icon: 'success',
        });
      })
    } catch(err) {
      swal({
        title: 'Ops!',
        text: 'Houve uma falha na exclusão, tente novamente.',
        icon: 'error',
      });

      console.log(err);
    }
  }

  return (
    <PokemonContainer>
      <Header>
        <Logo />
        <div>
          <Span>Fazer logout</Span>
          <Button type="button" onClick={handleLogout}>
            <FiPower size={22} color="#f821fe" />
          </Button>
        </div>
      </Header>

      <Content>
        <HeaderContent>
          <ResultTitle>{ResultLabel}</ResultTitle>
          <Button type="button" onClick={handleAddNewPokemon}>
            <FiPlus size={22} color="#f821fe" />
          </Button>
        </HeaderContent>

        <ListContainer>
          { !isFetching ? pokemons.map((pokemon) => (
            <ItemList key={pokemon._id}>
              <Text>
                <Title>Nome:</Title> {pokemon.name}
              </Text>
              <Text>
                <Title>Geração:</Title> {pokemon.generation}
              </Text>
              <Text>
                <Title>Quantidade de Ataques:</Title> {pokemon.attackQuantity}
              </Text>
              <Text>
                <Title>Tipos:</Title> {pokemon.types.join(', ')}
              </Text>
              
              <ActionContainer>
                <ButtonNoBorder type="button" onClick={() => handleDeletePokemon(pokemon._id)}>
                  <FiTrash2 size={22} color="#f821fe" />
                </ButtonNoBorder>
                <ButtonNoBorder type="button" onClick={() => handleEditPokemon(pokemon._id)}>
                  <FiSettings size={22} color="#f821fe" />
                </ButtonNoBorder>
              </ActionContainer>
            </ItemList>
          )) : <h1>Carregando</h1>}
        </ListContainer>
        <Pagination page={parseInt(page)} />
      </Content>
    </PokemonContainer>
  );
}
