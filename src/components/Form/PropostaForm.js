import React, { useState, useEffect } from 'react';
import { Container, Titulo } from '../../pages/Proposta/styled';
import propostaApi from '../../helpers/propostaApi';

import { useLocation } from 'react-router-dom';

import { Row, Col } from 'react-grid';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import DataPicker from "../DataPicker/DataPicker";

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

const PropostaForm = (props) => {

    const classes = useStyles();


    const [id, setId] = useState('');
    const [codigo, setCodigo] = useState('');
    const [assunto, setAssunto] = useState('');
    const [data, setData] = useState(new Date('2014-08-18T21:11:54'));
    const [data_validade, setData_validade] = useState(new Date('2014-08-18T21:11:54'));
    const [id_client, setId_client] = useState('');
    const [client, setClient] = useState('');
    const [error, setError] = useState('');
    const [newProposta, setProposta] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const { state } = location
        const { create, dados } = state
        setProposta(create)


        if (dados) {
            setId(dados.id)
            setCodigo(dados.codigo)
            setAssunto(dados.assunto)
            setData(dados.data)
            setData_validade(dados.data_validade)
            setId_client(dados.id_client)
        } else {
            setId('')
            setCodigo('')
            setAssunto('')
            setData('')
            setData_validade('')
            setId_client('')
        }

    }, [])


    const handleSubmit = async (e) => {
                //e.preventDefault();
        
        setError('');
        const json = newProposta ? await propostaApi.addProposta(codigo, assunto, data, data_validade, id_client) :
            await propostaApi.editProposta(id, codigo, assunto, data, data_validade, id_client)
            console.log(id, codigo, assunto, data, data_validade, id_client)
            console.log(json)
        if (json.error) {
            setError(json.error);
            alert("Preencha todos os campos");
            console.log(json.error)
        } else {
            window.location.href = '/proposta';
            
        }
    };

    const updateSelect = (value) => {
        setId_client(value)
        console.log(value)
    };

    return (
        <Container>
            <Row>
                <Titulo>{newProposta ? 'Cadastrar' : 'Editar'} de Proposta</Titulo>
            </Row>
            <Row>
                <Col className={classes.root}>
                    <TextField id="standard-basic" label="Código" value={codigo} onChange={e => setCodigo(e.target.value)} />
                </Col>
                <Col className={classes.root}>
                    <TextField id="standard-basic" label="Assunto" value={assunto} onChange={e => setAssunto(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col className={classes.root}>
                    <DataPicker selectedDate={data} setSelectedDate={setData} label="Data (dd/mm/yyyy)" />
                </Col>
                <Col className={classes.root}>
                    <DataPicker selectedDate={data_validade} setSelectedDate={setData_validade} label="Data de Validade (dd/mm/yyyy)" />
                </Col>
            </Row>
            <Row>
                <Col className={classes.root}>
                    <FormControl className={classes.formControl}>


                        <InputLabel htmlFor="age-native-simple">Cliente</InputLabel>

                        {console.log(props.data)}

                        <Select
                            native
                            value={id_client}
                            onChange={e => updateSelect(e.target.value)}

                        >
                            <option value="null">Selecione</option>
                            {props.client.map((dados) => (                     
                                <option value={dados.id}>{dados.nome}</option>
                        ))}
                        </Select>

                    </FormControl>
                </Col>
            </Row>

            <Row >
                <Col style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <Button variant="contained" color="primary" style={{ textTransform: "none", marginTop: "50px", padding: "5px 20px", width: "10%", cursor: "pointer" }} onClick={handleSubmit}>{newProposta ? 'Salvar' : 'Alterar'}</Button>
                </Col>
            </Row>

        </Container>
    );
}
export default PropostaForm;