import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import api from '../../helpers/api'
import ClientForm from '../../components/Form/ClientForm';

import { Container, Row, Col } from 'react-grid';

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [clients, setClients] = useState([]);

    const getClients = async () => {
        const res = await api.getClients();
        if (res.error === '') {
            setClients(res.result);
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
            <Row style={{ marginTop: "25px" }}>
                <Col style={{ position: "static" }}>
                    <Button variant="outlined" color="primary" onClick={() => history.push('/client')} style={{ textTransform: "none", marginTop: "25px", margin: "0px" }}>Voltar</Button>
                </Col>
            </Row>
        </Container>
    );
}