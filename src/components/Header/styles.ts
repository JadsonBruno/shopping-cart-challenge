import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3.125rem 0;

  a {
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }

    > svg {
      max-width: 12.5rem;
    }
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  div {
    text-align: right;
    margin-right: 0.625rem;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 0.75rem;
      color: #999;
    }
  }

  svg {
    max-width: 2.25rem;
  }
`;
