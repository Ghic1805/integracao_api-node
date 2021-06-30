import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, InputLabel, FormControl, Select, TextField } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useHistory } from 'react-router-dom';
import api from '../../helpers/api'


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



function MainTable(props) {
    const history = useHistory()

    // const [edit, setEdit] = useState(false);

    // const editing = () => {

    //     setEdit(!edit);
    //     console.log(edit);
    // };
    // function widthText(item) {
    //     return props.data && props.data.length > 0 ? ((item.length) * 10) : "100%";
    // };

    const useStyles = makeStyles(() => ({
        table: {
            maxWidth: 1110,
            width: "100%",

        },
        mainTable: {
            marginTop: 25
        },
        icons: {
            width: 22,
            height: "auto",
            cursor: "pointer",


        },
        acoesIcons: {
            display: "flex",
            padding: 16,
            justifyContent: "space-between",
        },


    }));

    const classes = useStyles();

    const openEdit = (dados) =>{
        history.push({pathname: '/client-dados', state: {create: false, dados}})
    };

    
    const delClient = async (dados) => {
        //console.log(dados)
        const res = await api.deleteClient(dados.id);
        if (res.error === '') {
            props.reset();
        }
    };



    return (
        <TableContainer className={classes.mainTable} component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Nome</StyledTableCell>
                        <StyledTableCell align="left">Tipo de Pessoa</StyledTableCell>
                        <StyledTableCell align="left">CPF/CNPJ</StyledTableCell>
                        <StyledTableCell align="left">CEP</StyledTableCell>
                        <StyledTableCell align="left">Endereço</StyledTableCell>
                        <StyledTableCell align="center">Ações</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((dados) => (
                        <StyledTableRow key={dados}>
                            <StyledTableCell align="left">{dados.nome}</StyledTableCell>
                            <StyledTableCell align="left">{dados.tipo_pessoa}</StyledTableCell>
                            <StyledTableCell align="left">{dados.cpf_cnpj}</StyledTableCell>
                            <StyledTableCell align="left">{dados.cep}</StyledTableCell>
                            <StyledTableCell align="left">{dados.endereco}</StyledTableCell>
                            <StyledTableCell align="center" className={classes.acoesIcons} >
                                <AiFillEdit onClick={()=>openEdit(dados)} className={classes.icons} />
                                <AiTwotoneDelete onClick={()=>delClient(dados)} className={classes.icons} />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MainTable;
