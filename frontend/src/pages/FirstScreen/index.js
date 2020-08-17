import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { FiUserPlus } from 'react-icons/fi';
import {
  HomeContainer,
  FormSection,
  Form,
  Title,
  Description,
  LinkText,
} from './styles';
import PrimaryButton from '../../components/PrimaryButton';

import Logo from '../../components/Logo';
import Cover from '../../components/Cover';

import cover from '../../assets/images/two-players.svg';

export default function Home() {
  const history = useHistory();

  function handleClick(e) {
    e.preventDefault();

    history.push('/login');
  }

  return (
    <HomeContainer>
      <FormSection>
        <Logo width="130" />
        <Form>
          <Title>Essa é a Pokedex</Title>
          <Description>
            Aqui você tem uma grade completa de Pokemons, gerencia a sua própria
            pokedex.
          </Description>
          <PrimaryButton title="Fazer login" onClick={(e) => handleClick(e)} />
          <Link className="back-link" to="/register">
            <FiUserPlus size={16} color="#3f3d55" />
            <LinkText>Criar uma conta</LinkText>
          </Link>
        </Form>
      </FormSection>
      <Cover image={cover} size="700" />
    </HomeContainer>
  );
}
