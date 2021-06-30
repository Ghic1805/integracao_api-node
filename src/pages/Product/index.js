import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Titulo } from './styled';


export default () => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <Container>
            <Titulo>Produtos</Titulo>
        </Container>
    );
}