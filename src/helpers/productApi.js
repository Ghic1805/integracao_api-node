const BASEAPI = 'http://localhost:3000/api';

const apiFetchPost = async (endpoint, body) => {
    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed) {
        window.localtion.href = '/';
        return;
    }
    return json;
}

const apiFetchPut = async (endpoint, body) => {
    const res = await fetch(BASEAPI+endpoint, {
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed) {
        window.localtion.href = `/product/${body.id}`;
        return;
    }
    return json;
}
const apiFetchDelete = async (endpoint, body) => {
    const res = await fetch(BASEAPI+endpoint, {
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed) {
        window.localtion.href = `/product/${body.id}`;
        return;
    }
    return json;
}

export default {
    getProducts : async () => {
        const res = await fetch(BASEAPI+'/products');
        const json = await res.json();
        return json;
    },
    addProduct:async (descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao) => {
        const json = await apiFetchPost(
            '/product',
            {
                descricao,
                descritivo,
                valor_de_venda,
                tipo,
                forma_de_comercializacao
            }
        );
        return json;
    },
    editProduct:async (id, descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao) => {
        const json = await apiFetchPut(
            `/product/${id}`,
            {
                id,
                descricao,
                descritivo,
                valor_de_venda,
                tipo,
                forma_de_comercializacao
            }
        );
        return json;
    },
    deleteProduct:async (id) => {
        const json = await apiFetchDelete(
            `/product/${id}`,
            {id}
        );
        return json;
    },
    
    
};