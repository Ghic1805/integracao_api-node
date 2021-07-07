import React, { useState, useEffect } from 'react';
import { Container, Titulo } from '../../pages/Product/styled';
import productApi from '../../helpers/productApi';
import { useLocation } from 'react-router-dom';

import { Row, Col } from 'react-grid';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '400px',
            marginTop: '15px'
        },
    }, formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginTop: '15px'
    },
    selectEmpty: {
        marginTop: '15px',
    },
}));

const ProductForm = () => {

    const classes = useStyles();


    const [id, setId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [descritivo, setDescritivo] = useState('');
    const [valor_de_venda, setValor_de_venda] = useState('');
    const [tipo, setTipo] = useState('');
    const [forma_de_comercializacao, setForma_de_comercializacao] = useState('');
    const [error, setError] = useState('');
    const [newProduct, setNewProduct] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const { state } = location
        const { create, dados } = state
        setNewProduct(create)

        if (dados) {
            console.log(dados)
            setId(dados.id)
            setDescricao(dados.descricao)
            setDescritivo(dados.descritivo)
            setValor_de_venda(dados.valor_de_venda)
            setTipo(dados.tipo)
            setForma_de_comercializacao(dados.forma_de_comercializacao)
        } else {
            setId('')
            setDescricao('')
            setDescritivo('')
            setValor_de_venda('')
            setTipo('')
            setForma_de_comercializacao('')
        }

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const json = newProduct ? await productApi.addProduct(descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao) :
            await productApi.editProduct(id, descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao)

        if (json.error) {
            setError(json.error);
            alert("Preencha todos os campos");
        } else {
            window.location.href = '/product';
        }
    };
    return (
        <Container>
            <Row>
                <Titulo>{newProduct ? 'Cadastrar' : 'Editar'} de Produtos</Titulo>
            </Row>
            <Row>
                <Col className={classes.root}>
                    <TextField id="standard-basic" label="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                </Col>
                <Col className={classes.root}>
                    <TextField id="standard-basic" label="Descritivo" value={descritivo} onChange={e => setDescritivo(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col className={classes.root}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Tipo</InputLabel>
                        <Select
                            native
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}

                        >
                            <option>Selecionar</option>
                            <option value="Saas">Saas</option>
                            <option value="Locação">Locação</option>
                            <option value="Serviço Técnico">Serviço Técnico</option>
                            <option value="Produto">Produto</option>
                        </Select>
                    </FormControl>
                </Col>
                <Col className={classes.root}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Forma de Comercialização</InputLabel>
                        <Select
                            native
                            value={forma_de_comercializacao}
                            onChange={e => setForma_de_comercializacao(e.target.value)}

                        >
                            <option>Selecionar</option>
                            <option value="Venda Direta">Venda Direta</option>
                            <option value="Mensalidade">Mensalidade</option>
                            <option value="Trimestralidade">Trimestralidade</option>
                            <option value="Semestralidade">Semestralidade</option>
                            <option value="Anualidade">Anualidade</option>
                        </Select>
                    </FormControl>
                </Col>
            </Row>
            <Row>
                <Col className={classes.root}>
                    <TextField helperText="Exemplo: 9999.99"id="standard-basic" label="Valor de Venda" value={valor_de_venda} onChange={e => setValor_de_venda(e.target.value)} />
                </Col>
            </Row>
            <Row >
                <Col style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <Button variant="contained" color="primary" style={{ textTransform: "none", marginTop: "50px", padding: "5px 20px", width: "10%", cursor: "pointer" }} onClick={handleSubmit}>{newProduct ? 'Salvar' : 'Alterar'}</Button>
                </Col>
            </Row>

        </Container>
    );
}
export default ProductForm;