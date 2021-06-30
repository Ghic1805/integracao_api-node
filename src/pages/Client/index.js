import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Titulo } from './styled';

import api from '../../helpers/api'
import MainTable from '../../components/Table/MainTable';
import ClientForm from '../../components/Form/ClientForm';
import EditClientForm from '../../components/Form/EditClientForm';

import { Container, Row, Col } from 'react-grid';
import { Button } from '@material-ui/core';

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [clients, setClients] = useState([]);

    const getClients = async () => {
        const cli = await api.getClients();
        if (cli.error === '') {
            setClients(cli.result);
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    const reset = () => {
        getClients();
    };


    return (
        <Container>
            <Row>
                <Col style={{ position: "static" }}>
                    <Titulo>Cliente</Titulo>
                </Col>
                <Col style={{ position: "static", display: "flex", justifyContent: "flex-end", alignItems: "center", marginLeft: "0px" }}>
                    <Button onClick={() => history.push({pathname: '/client-dados', state: {create: true, dados: false}})} style={{ border: "2px solid #000", borderRadius: "5px", marginTop: "25px", margin: "0px" }}>Novo Cliente</Button>
                </Col>
            </Row>
            <MainTable reset={reset} data={clients} />

        </Container>
    );
}