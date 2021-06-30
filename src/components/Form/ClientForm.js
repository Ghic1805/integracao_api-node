import React, { useState, useEffect } from 'react';
import { Container, Titulo, Grid } from '../../pages/Client/styled';
import api from '../../helpers/api';
import { useLocation } from 'react-router-dom';

const ClientForm = () => {
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

        if(dados) {
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
        e.preventDefault();
        setError('');
        const json = newUser ? await api.addClient(nome, tipo_pessoa, cpf_cnpj, cep, endereco) :
        await api.editClient(id, nome, tipo_pessoa, cpf_cnpj, cep, endereco)
        
        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = '/client';
        }
    };
    return (
            <div style={{}}>
                <Titulo>{newUser ? 'Cadastrar' : 'Editar'} de Clientes</Titulo>

                <label className="area">
                    <div className="area--title">Nome</div>
                    <div className="area--input">
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            require
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Tipo Pessoa</div>
                    <select value={tipo_pessoa} onChange={e => setTipo_pessoa(e.target.value)} require>
                        <option>Selecionar</option>
                        <option value="Física">Física</option>
                        <option value="Jurídica">Jurídica</option>
                    </select>
                </label>
                <label className="area">
                    <div className="area--title">CEP</div>
                    <div className="area--input">
                        <input
                            type="text"
                            value={cep}
                            onChange={e => setCep(e.target.value)}
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Endereço</div>
                    <div className="area--input">
                        <input
                            type="text"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">CPF/CNPJ</div>
                    <div className="area--input">
                        <input
                            type="numeric"
                            value={cpf_cnpj}
                            onChange={e => setCpf_cnpj(e.target.value)}
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title"></div>
                    <button style={{marginTop: "25px", padding: "5px 20px"}} onClick={handleSubmit}>{newUser ? 'Salvar' : 'Alterar'}</button>

                </label>

            </div>
    );
}
export default ClientForm;