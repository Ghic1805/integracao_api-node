import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Titulo } from './styled';

import productApi from '../../helpers/productApi'
import ProductTable from '../../components/Table/ProductTable';

import { Container, Row, Col } from 'react-grid';
import { Button } from '@material-ui/core';

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const res = await productApi.getProducts();
        if (res.error === '') {
            setProducts(res.result);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const reset = () => {
        getProducts();
    };


    return (
        <Container>
            <Row>
                <Col style={{ position: "static" }}>
                    <Titulo>Produto</Titulo>
                </Col>
                <Col style={{ position: "static", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginLeft: "0px" }}>
                    <Button onClick={() => history.push({pathname: '/product-dados', state: {create: true, dados: false}})} style={{ border: "2px solid #000", borderRadius: "5px", marginTop: "25px", margin: "0px" }}>Novo Produto</Button>
                </Col>
            </Row>
            <ProductTable reset={reset} data={products} />

        </Container>
    );
}