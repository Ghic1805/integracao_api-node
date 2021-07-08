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
import propostaApi from '../../helpers/propostaApi'
import moment from 'moment';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableCellAction = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        width: 100
    },
    body: {
        fontSize: 14,
        width: 100
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



function PropostaTable(props) {
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
        propostaTable: {
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

    const openEdit = (dados) => {
        history.push({ pathname: '/proposta-dados', state: { create: false, dados } })
    };


    const delProposta = async (dados) => {
        //console.log(dados)
        const res = await propostaApi.deleteProposta(dados.id);
        if (res.error === '') {
            props.reset();
        }
    };



    return (
        <TableContainer className={classes.propostaTable} component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Código</StyledTableCell>
                        <StyledTableCell align="left">Assunto</StyledTableCell>
                        <StyledTableCell align="center">Data</StyledTableCell>
                        <StyledTableCell align="center">Data de Validade</StyledTableCell>
                        <StyledTableCell align="center">Nome do Cliente</StyledTableCell>
                        <StyledTableCellAction align="center">Ações</StyledTableCellAction>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((dados) => (
                        
                        <StyledTableRow key={dados}>
                            <StyledTableCell align="left">{dados.codigo}</StyledTableCell>
                            <StyledTableCell align="left">{dados.assunto}</StyledTableCell>
                            <StyledTableCell align="center">{moment(dados.data).format('DD/MM/YYYY')}</StyledTableCell>
                            <StyledTableCell align="center">{moment(dados.data_validade).format('DD/MM/YYYY')}</StyledTableCell>
                            <StyledTableCell align="center">{dados.nome}</StyledTableCell>

                            <StyledTableCell align="center" className={classes.acoesIcons} >
                                <AiFillEdit onClick={() => openEdit(dados)} className={classes.icons} />
                                <AiTwotoneDelete onClick={() => delProposta(dados)} className={classes.icons} />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PropostaTable;
