import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import api from '../../helpers/api'
import propostaApi from '../../helpers/propostaApi'
import PropostaForm from '../../components/Form/PropostaForm';

import { Container, Row, Col } from 'react-grid';

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [proposta, setProposta] = useState([]);
    const [clients, setClients] = useState([]);

    const getProposta = async () => {
        const res = await propostaApi.getProposta();
        if (res.error === '') {
            setProposta(res.result);
        }
    };

    const getClients = async () => {
        const cli = await api.getClients();
        if (cli.error === '') {
            setClients(cli.result);
        }
    };

    useEffect(() => {
        getProposta();
        getClients();
    }, []);
    

    return (
        <Container>
            <Row>
                <Col style={{ position: "static" }}>
                    <PropostaForm client={clients} data={proposta}></PropostaForm>                    
                </Col>

            </Row>
            <Row style={{ marginTop: "25px" }}>
                <Col style={{ position: "static" }}>
                    <Button variant="outlined" color="primary" onClick={() => history.push('/proposta')} style={{ textTransform: "none", marginTop: "25px", margin: "0px" }}>Voltar</Button>
                </Col>
            </Row>
        </Container>
    );
}