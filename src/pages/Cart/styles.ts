import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
    padding: 1.875rem;
    background: #fff;
    border-radius: 0.25rem;

    footer {
        margin-top: 1.875rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            background: #2185d0;
            color: #fff;
            border: 0;
            border-radius: 0.25rem;
            padding: 0.75rem 1.25rem;
            font-weight: bold;
            text-transform: uppercase;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.06, '#2185d0')};
            }
        }
    }
`;

export const ProductTable = styled.table`
    width: 100%;

    thead th {
        color: #999;
        text-align: left;
        padding: 0.75rem;
    }

    tbody td {
        padding: 0.75rem;
        border-bottom: 0.0625rem solid #eee;
    }

    img {
        height: 6.25rem;
    }

    strong {
        color: #333;
        display: block;
    }

    span {
        display: block;
        margin-top: 0.3125rem;
        font-size: 1.125rem;
        font-weight: bold;
    }

    div {
        display: flex;
        align-items: center;

        input {
            border: 0.0625rem solid #ddd;
            border-radius: 0.25rem;
            color: #666;
            padding: 0.375rem;
            width: 3.125rem;
        }
    }

    button {
        background: none;
        border: 0;
        padding: 0.375rem;

        svg {
            color: #2185d0;
            transition: color 0.2s;
        }

        &:hover {
            svg {
                color: ${darken(0.06, '#2185d0')};
            }
        }

        &:disabled {
            svg {
                color: ${lighten(0.25, '#2185d0')};
                cursor: not-allowed;
            }
        }
    }
`;

export const Total = styled.div`
    display: flex;
    align-items: baseline;

    span {
        color: #999;
        font-weight: bold;
    }

    strong {
        font-size: 1.75rem;
        margin-left: 0.3125rem;
    }
`;

export const ModalContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
        margin-top: 1rem;
    }

    &:last-child {
        margin-top: 1.2rem;
    }
`;
