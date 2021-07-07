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
        window.localtion.href = `/proposta/${body.id}`;
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
        window.localtion.href = `/proposta/${body.id}`;
        return;
    }
    return json;
}

export default {
    getProposta : async () => {
        const res = await fetch(BASEAPI+'/propostas');
        const json = await res.json();
        return json;
    },
    addProposta:async (codigo, assunto, data, data_validade, id_client) => {
        const json = await apiFetchPost(
            '/proposta',
            {
                codigo,
                assunto,
                data,
                data_validade,
                id_client
            }
        );
        return json;
    },
    editProposta:async (id, codigo, assunto, data, data_validade, id_client) => {
        console.log(id, codigo, assunto, data, data_validade, id_client)
        const json = await apiFetchPut(
            `/proposta/${id}`,
            {
                id,
                codigo,
                assunto,
                data,
                data_validade,
                id_client
            }
        );
        return json;
    },
    deleteProposta:async (id) => {
        const json = await apiFetchDelete(
            `/proposta/${id}`,
            {id}
        );
        return json;
    }
    
    
};