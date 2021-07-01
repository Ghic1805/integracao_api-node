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
import productApi from '../../helpers/productApi'


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



function ProductTable(props) {
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
        productTable: {
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
        history.push({pathname: '/product-dados', state: {create: false, dados}})
    };

    
    const delProduct = async (dados) => {
        //console.log(dados)
        const res = await productApi.deleteProduct(dados.id);
        if (res.error === '') {
            props.reset();
        }
    };



    return (
        <TableContainer className={classes.productTable} component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Descrição</StyledTableCell>
                        <StyledTableCell align="left">Descritivo</StyledTableCell>
                        <StyledTableCell align="right">Valor de Venda</StyledTableCell>
                        <StyledTableCell align="center">Tipo</StyledTableCell>
                        <StyledTableCell align="left">Forma de Comercialização</StyledTableCell>
                        <StyledTableCellAction align="center">Ações</StyledTableCellAction>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((dados) => (
                        <StyledTableRow key={dados}>
                            <StyledTableCell align="left">{dados.descricao}</StyledTableCell>
                            <StyledTableCell align="left">{dados.descritivo}</StyledTableCell>
                            <StyledTableCell align="right">{dados.valor_de_venda}</StyledTableCell>
                            <StyledTableCell align="center">{dados.tipo}</StyledTableCell>
                            <StyledTableCell align="left">{dados.forma_de_comercializacao}</StyledTableCell>
                            <StyledTableCell align="center" className={classes.acoesIcons} >
                                <AiFillEdit onClick={()=>openEdit(dados)} className={classes.icons} />
                                <AiTwotoneDelete onClick={()=>delProduct(dados)} className={classes.icons} />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductTable;
