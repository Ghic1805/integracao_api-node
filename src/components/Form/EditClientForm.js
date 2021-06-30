import React, { useState, useEffect } from 'react';
import { Container, Titulo, Grid } from '../../pages/Client/styled';
import api from '../../helpers/api';
const EditClientForm = () => {
    const [nome, setNome] = useState('');
    const [tipo_pessoa, setTipo_pessoa] = useState('');
    const [cpf_cnpj, setCpf_cnpj] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [error, setError] = useState('');



    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        const json = await api.editClient(nome, tipo_pessoa, cpf_cnpj, cep, endereco);
        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = '/client';
        }
    };
    return (
            <div style={{}}>
                <Titulo>Editar Cadastro de Clientes</Titulo>

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
                    <button style={{marginTop: "25px", padding: "5px 20px"}} onClick={handleSave}>Salvar</button>

                </label>

            </div>
    );
}
export default EditClientForm;