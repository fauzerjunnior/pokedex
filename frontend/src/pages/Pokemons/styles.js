import styled from 'styled-components';

export const PokemonContainer = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Span = styled.span`
  font-size: 16px;
`;

export const Button = styled.button`
  height: 60px;
  width: 60px;
  border-radius: 4px;
  border: 1px solid #dcdce6;
  background: transparent;
  margin-left: 16px;
  transition: border-color 0.2s;
`;

export const Content = styled.div`
  margin-top: 20px;
`;

export const ListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  list-style: none;
`;

export const ItemList = styled.li`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;
  margin-top: 30px;
`;

export const Title = styled.span`
  color: #333;
  line-height: 21px;
  font-size: 16px;
  font-weight: bold;
`;

export const Text = styled.p`
  color: #727280;
  line-height: 21px;
  font-size: 16px;
  padding: 5px 0px;
`;

export const ResultTitle = styled.h1`
  margin: 60px 0px 40px;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
