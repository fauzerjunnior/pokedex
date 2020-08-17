import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FiPower, FiPlus } from 'react-icons/fi';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

import api from '../../services/api';

import {
  PokemonContainer,
  Header,
  Span,
  Button,
  Content,
  ListContainer,
  ItemList,
  Text,
  Title,
  ResultTitle,
  HeaderContent,
} from './styles';

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [ResultLabel, setResultLabel] = useState('');

  const history = useHistory();
  const userToken = localStorage.getItem('userToken');

  useEffect(() => {
    api
      .get('pokemons', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setPokemons(response.data);

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
  }, [userToken]);

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  function handleAddNewPokemon() {
    history.push('/add-new-pokemon');
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
          {pokemons.map((pokemon) => (
            <ItemList>
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
            </ItemList>
          ))}
        </ListContainer>
      </Content>
    </PokemonContainer>
  );
}
