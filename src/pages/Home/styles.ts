import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.main`
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    flex-direction: column;

    ul {
        margin-top: 2rem;
    }
`;

export const ProductList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    grid-gap: 1.25rem;
    list-style: none;
    width: 100%;
    height: 100%;

    li {
        display: flex;
        flex-direction: column;
        background: #fff;
        border-radius: 0.25rem;
        padding: 1.25rem;

        img {
            align-self: center;
            max-width: 15.625rem;
        }

        > strong {
            font-size: 1rem;
            line-height: 1.25rem;
            color: #333;
            margin-top: 0.3125rem;
        }

        > span {
            font-size: 1.3125rem;
            font-weight: bold;
            margin: 0.3125rem 0 1.25rem;
        }

        button {
            background: #2185d0;
            color: #fff;
            border: 0;
            border-radius: 0.25rem;
            overflow: hidden;
            margin-top: auto;

            display: flex;
            align-items: center;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.06, '#2185d0')};
            }

            div {
                display: flex;
                align-items: center;
                padding: 0.75rem;
                background: rgba(0, 0, 0, 0.1);

                svg {
                    margin-right: 0.3125rem;
                }
            }

            span {
                flex: 1;
                text-align: center;
                font-weight: bold;
                font-size: 1rem;
            }
        }
    }
`;
