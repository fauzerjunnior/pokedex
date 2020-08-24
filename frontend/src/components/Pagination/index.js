import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

import { ListPaginate, PageItem, Text } from './styles';

const isFirstPage = (page) => {
  if (page >= 1) return true;
}

const Pagination = (props) => {
  return (
    <ListPaginate>
        { isFirstPage(props.page) && props.page !== 1  && <PageItem>
          <Link style={{ textDecoration: 'none' }} to={`/pokemons/page=${parseInt(props.page) -1 }`}>
            <FiArrowLeft />
          </Link>
        </PageItem> }

        <PageItem>
          <Text>{ parseInt(props.page) }</Text>
        </PageItem>

        <PageItem>
          <Link style={{ textDecoration: 'none' }} to={`/pokemons/page=${parseInt(props.page) +1 }`}>
            <Text>{ parseInt(props.page) +1 }</Text>
          </Link>
        </PageItem>

        { isFirstPage(props.page) && <PageItem>
          <Link style={{ textDecoration: 'none' }} to={`/pokemons/page=${parseInt(props.page) +1 }`}>
            <FiArrowRight />
          </Link>
        </PageItem> }
    </ListPaginate>
  );
};

export default Pagination;
