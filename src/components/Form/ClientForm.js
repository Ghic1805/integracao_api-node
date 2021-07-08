import React, { useState, useEffect } from 'react';
import { Container, Titulo, Grid } from '../../pages/Client/styled';
import api from '../../helpers/api';
import { useLocation } from 'react-router-dom';

import { Row, Col } from 'react-grid';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputMask from "react-input-mask";
import util from '../../util/util'

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

const ClientForm = () => {

    const classes = useStyles();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [tipo_pessoa, setTipo_pessoa] = useState('');
    const [cpf_cnpj, setCpf_cnpj] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [error, setError] = useState('');
    const [newUser, setNewUser] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const { state } = location
        const { create, dados } = state
        setNewUser(create)

        if (dados) {
            console.log(dados)
            setId(dados.id)
            setNome(dados.nome)
            setTipo_pessoa(dados.tipo_pessoa)
            setCpf_cnpj(dados.cpf_cnpj)
            setCep(dados.cep)
            setEndereco(dados.endereco)
        } else {
            setId('')
            setNome('')
            setTipo_pessoa('')
            setCpf_cnpj('')
            setCep('')
            setEndereco('')
        }

    }, [])


    const handleSubmit = async (e) => {
        //e.preventDefault();
        setError('');

        const json = newUser ? await api.addClient(nome, tipo_pessoa, util.normalizeCPFAndCNPJ(cpf_cnpj), util.normalizeCep(cep), endereco) :
            await api.editClient(id, nome, tipo_pessoa, util.normalizeCPFAndCNPJ(cpf_cnpj), util.normalizeCep(cep), endereco)


        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = '/client';
        }
    };

    const resetCpfCnpj = (value) => {
        setTipo_pessoa(value)
        setCpf_cnpj('')
    }
    
    const inputs = () => {
        if (tipo_pessoa === "Jurídica") {
            return (
                <InputMask
                    mask="99.999.999/9999-99"
                    value={cpf_cnpj}
                    onChange={e => setCpf_cnpj(e.target.value)}
                    disabled={false}
                    maskChar={null}
                >
                    {() => <TextField id="standard-basic" label="CNPJ" />}
                </InputMask >
            )
        } else if (tipo_pessoa === "Física") {
            return (
                <InputMask
                    mask="999.999.999-99"
                    value={cpf_cnpj}
                    onChange={e => setCpf_cnpj(e.target.value)}
                    disabled={false}
                    maskChar={null}
                >
                    {() => <TextField id="standard-basic" label="CPF" />}
                </InputMask >
            )
        }
    };

    return (
        <Container>
            <Row>
                <Titulo>{newUser ? 'Cadastrar' : 'Editar'} de Clientes</Titulo>
            </Row>
            <Row>
                <Col className={classes.root}>
                    <TextField id="standard-basic" label="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                </Col>
                <Col className={classes.root}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Tipo</InputLabel>
                        <Select
                            native
                            value={tipo_pessoa}
                            onChange={e => resetCpfCnpj(e.target.value)}

                        >
                            <option disabled>Selecionar</option>
                            <option value="Física">Física</option>
                            <option value="Jurídica">Jurídica</option>
                        </Select>
                    </FormControl>
                </Col>
            </Row>
            <Row>
                <Col className={classes.root}>
                    <InputMask
                        mask="99999-999"
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                        disabled={false}
                        maskChar={null}
                    >
                        {() => <TextField id="standard-basic" label="Cep" />}
                    </InputMask>
                </Col>
                <Col className={classes.root}>
                    {inputs()}
                </Col>                
            </Row>
            <Row>                
                <Col className={classes.root}>
                    <TextField id="standard-basic" label="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} />
                </Col>
            </Row>
            <Row >
                <Col style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <Button variant="contained" color="primary" style={{ textTransform: "none", marginTop: "50px", padding: "5px 20px", width: "10%", cursor: "pointer" }} onClick={handleSubmit}>{newUser ? 'Salvar' : 'Alterar'}</Button>
                </Col>
            </Row>
        </Container>
    );
}
export default ClientForm;