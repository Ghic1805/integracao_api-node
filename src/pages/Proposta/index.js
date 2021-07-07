import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Titulo } from './styled';

import propostaApi from '../../helpers/propostaApi'
import PropostaTable from '../../components/Table/PropostaTable';

import { Container, Row, Col } from 'react-grid';
import { Button } from '@material-ui/core';

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [proposta, setProposta] = useState([]);

    const getProposta = async () => {
        const res = await propostaApi.getProposta();
        if (res.error === '') {
            setProposta(res.result);
        }
    };
    

    useEffect(() => {
        getProposta();
    }, []);


    const reset = () => {
        getProposta();
    };


    return (
        <Container>
            <Row>
                <Col style={{ position: "static" }}>
                    <Titulo>Proposta</Titulo>
                </Col>
                <Col style={{ position: "static", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginLeft: "0px" }}>
                    <Button variant="contained" color="primary" onClick={() => history.push({pathname: '/proposta-dados', state: {create: true, dados: false}})} style={{ textTransform: "none",marginTop: "25px", margin: "0px" }}>Nova Proposta</Button>
                </Col>
            </Row>
            <PropostaTable reset={reset} data={proposta} />

        </Container>
    );
}