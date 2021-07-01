import React, { useState, useEffect } from 'react';
import { Container, Titulo, Grid } from '../../pages/Client/styled';
import productApi from '../../helpers/productApi';
import { useLocation } from 'react-router-dom';

const ClientForm = () => {
    const [id, setId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [descritivo, setDescritivo] = useState('');
    const [valor_de_venda, setValor_de_venda] = useState('');
    const [tipo, setTipo] = useState('');
    const [forma_de_comercializacao, setDorma_de_comercializacao] = useState('');
    const [error, setError] = useState('');
    const [newProduct, setNewProduct] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const { state } = location
        const { create, dados } = state
        setNewProduct(create)

        if(dados) {
            console.log(dados)
            setId(dados.id)
            setDescricao(dados.descricao)
            setDescritivo(dados.descritivo)
            setValor_de_venda(dados.valor_de_venda)
            setTipo(dados.tipo)
            setDorma_de_comercializacao(dados.forma_de_comercializacao)
        } else {
            setId('')
            setDescricao('')
            setDescritivo('')
            setValor_de_venda('')
            setTipo('')
            setDorma_de_comercializacao('')
        }

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const json = newProduct ? await productApi.addProduct(descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao) :
        await productApi.editProduct(id, descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao)
        
        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = '/product';
        }
    };
    return (
            <Container>
                <Titulo>{newProduct ? 'Cadastrar' : 'Editar'} de Produtos</Titulo>

                <label className="area">
                    <div className="area--title">Descrição</div>
                    <div className="area--input">
                        <input
                            type="text"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            require
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Descritivo</div>
                    <div className="area--input">
                        <input
                            type="text"
                            value={descritivo}
                            onChange={e => setDescritivo(e.target.value)}
                            require
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Tipo</div>
                    <div className="area--input">
                        <input
                            type="text"
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Forma de Comercialização</div>
                    <div className="area--input">
                        <input
                            type="text"
                            value={forma_de_comercializacao}
                            onChange={e => setDorma_de_comercializacao(e.target.value)}
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Valor de Venda</div>
                    <div className="area--input">
                        <input
                            type="numeric"
                            value={valor_de_venda}
                            onChange={e => setValor_de_venda(e.target.value)}
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title"></div>
                    <button style={{marginTop: "25px", padding: "5px 20px"}} onClick={handleSubmit}>{newProduct ? 'Salvar' : 'Alterar'}</button>

                </label>

            </Container>
    );
}
export default ClientForm;