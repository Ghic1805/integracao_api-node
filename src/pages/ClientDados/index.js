import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import api from '../../helpers/api'
import ClientForm from '../../components/Form/ClientForm';
import EditClientForm from '../../components/Form/EditClientForm';

import { Container, Row, Col } from 'react-grid';

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



    return (
        <Container>
            <Row>
                <Col style={{ position: "static" }}>
                    <ClientForm></ClientForm>
                </Col>
                
            </Row>
            <Row style={{ marginTop: "25px"}}>
                <Button onClick={() => history.push('/client')} style={{ border: "2px solid #000", borderRadius: "5px", marginTop: "25px", margin: "0px" }}>Voltar</Button>
            </Row>

        </Container>
    );
}