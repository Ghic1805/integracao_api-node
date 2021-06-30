import React from 'react';
import { useHistory } from "react-router-dom";
import { Container, Titulo } from './styled';

export default () => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push('/tela2/testador');
    }

    return (
        <Container>
            <Titulo>React - Desafio 01</Titulo>
            <button onClick={handleButtonClick}>Ir para Tela 2</button>
        </Container>
    );
}